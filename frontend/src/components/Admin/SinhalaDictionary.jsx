import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { IoMdAddCircleOutline, IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";


const SinhalaDictionary = () => {
  const [words, setWords] = useState([]);
  const [showAddWordModal, setShowAddWordModal] = useState(false);
  const [newWord, setNewWord] = useState({ sinhalaWord: "", englishWords: ["", "", ""] });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sinhala-dictionary/getWords');
        setWords(response.data);
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };

    fetchWords();
  }, []);

  const handleAccept = (id, index) => {
    setWords(words.map(word =>
      word._id === id
        ? {
            ...word,
            status: word.status ? word.status.map((status, i) => (i === index ? "accepted" : status)) : []
          }
        : word
    ));
  };

  const handleReject = (id, index) => {
    setWords(words.map(word =>
      word._id === id
        ? {
            ...word,
            status: word.status ? word.status.map((status, i) => (i === index ? "rejected" : status)) : []
          }
        : word
    ));
  };

  const handleShowAddWordModal = () => setShowAddWordModal(true);
  const handleCloseAddWordModal = () => setShowAddWordModal(false);

  const handleAddWord = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/sinhala-dictionary/addWord', newWord);
      setWords([...words, response.data.word]);
      setNewWord({ sinhalaWord: "", englishWords: ["", "", ""] });
      setValidated(false);
      handleCloseAddWordModal();
    } catch (error) {
      console.error("Error adding word:", error);
    }
  };

  const handleEnglishWordChange = (index, value) => {
    setNewWord(prevState => {
      const updatedWords = [...prevState.englishWords];
      updatedWords[index] = value;
      return { ...prevState, englishWords: updatedWords };
    });
  };

  return (
    <div className="container mt-5" style={{ paddingLeft: "0px"}}>
      <h1 className="mb-5 text-center">Sinhala Dictionary Words</h1>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/AddToDictionary">
          <Button variant="primary" onClick={handleShowAddWordModal}>
            <IoMdAddCircleOutline className="mb-1" /> Add Word
          </Button>
        </Link>
      </div><br/>

      <Table bordered hover className="table-bordered" style={{ backgroundColor: "#f9f9f9", borderRadius: "10px", overflow: "hidden", border: "2px solid black", width: "100%", tableLayout: "fixed" }}>
        <thead>
          <tr align="center" style={{ backgroundColor: "#007bff", color: "white", fontSize: "15px" }}>
            <th style={{ padding: "5px", width: "25%" }}>Sinhala Word</th>
            <th style={{ padding: "5px", width: "25%" }}>English Word 1</th>
            <th style={{ padding: "5px", width: "18%" }}>Status 1</th>
            <th style={{ padding: "10px", width: "10%" }}>Action 1</th>
            <th style={{ padding: "5px", width: "25%" }}>English Word 2</th>
            <th style={{ padding: "5px", width: "18%" }}>Status 2</th>
            <th style={{ padding: "10px", width: "10%" }}>Action 2</th>
            <th style={{ padding: "5px", width: "25%" }}>English Word 3</th>
            <th style={{ padding: "5px", width: "18%" }}>Status 3</th>
            <th style={{ padding: "10px", width: "10%" }}>Action 3</th>
          </tr>
        </thead>
        <tbody>
          {words.length === 0 ? (
            <tr>
              <td colSpan="10" align="center" style={{ padding: "5px", fontSize: "15px", color: "#555" }}>
                No words available. Add some words!
              </td>
            </tr>
          ) : (
            words.map((word) => (
              <tr key={word._id}>
                <td align="center" style={{ padding: "5px", fontSize: "15px", fontWeight: "bold" }}>{word.sinhalaWord}</td>
                {word.englishWords.map((meaning, index) => (
                  <React.Fragment key={index}>
                    <td align="center" style={{ padding: "5px", fontSize: "15px" }}>{meaning}</td>
                    <td align="center" style={{ padding: "5px", fontSize: "15px", textTransform: "capitalize" }}>
                      {word.status ? word.status[index] : "pending"}
                    </td>
                    <td align="center" style={{ padding: "5px", display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="link"
                        className="me-2"
                        disabled={word.status && word.status[index] !== "pending"}
                        onClick={() => handleAccept(word._id, index)}
                      >
                        <IoMdCheckmarkCircleOutline size={10} />
                      </Button>
                      <Button
                        variant="link"
                        disabled={word.status && word.status[index] !== "pending"}
                        onClick={() => handleReject(word._id, index)}
                      >
                        <IoMdCloseCircleOutline size={10} />
                      </Button>
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Modal show={showAddWordModal} onHide={handleCloseAddWordModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Word</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleAddWord}>
          <Modal.Body>
            <Form.Group controlId="sinhalaWord">
              <Form.Label>Sinhala Word</Form.Label>
              <Form.Control
                type="text"
                value={newWord.sinhalaWord}
                onChange={(e) => setNewWord({ ...newWord, sinhalaWord: e.target.value })}
                required
              />
              <Form.Control.Feedback type="invalid">Please provide a Sinhala word.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="englishWords" className="mt-3">
              <Form.Label>English Words</Form.Label>
              {newWord.englishWords.map((word, index) => (
                <Form.Control
                  key={index}
                  type="text"
                  value={word}
                  onChange={(e) => handleEnglishWordChange(index, e.target.value)}
                  required={index === 0} // Make the first one required
                  placeholder={`English Word ${index + 1}`}
                  className="mt-2"
                />
              ))}
              <Form.Control.Feedback type="invalid">Please provide at least one English word.</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddWordModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add Word
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default SinhalaDictionary;