import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { IoMdAddCircleOutline, IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";

const SinhalaDictionary = () => {
  const [words, setWords] = useState([]);
  const [showAddWordModal, setShowAddWordModal] = useState(false);
  const [newWord, setNewWord] = useState({ englishWord: "", sinhalaMeanings: ["", "", ""] });
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
      setNewWord({ englishWord: "", sinhalaMeanings: ["", "", ""] });
      setValidated(false);
      handleCloseAddWordModal();
    } catch (error) {
      console.error("Error adding word:", error);
    }
  };

  const handleMeaningChange = (index, value) => {
    setNewWord(prevState => {
      const updatedMeanings = [...prevState.sinhalaMeanings];
      updatedMeanings[index] = value;
      return { ...prevState, sinhalaMeanings: updatedMeanings };
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-5 text-center">Sinhala Dictionary Words</h1>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/AddToDictionary">
          <Button variant="primary" onClick={handleShowAddWordModal}>
            <IoMdAddCircleOutline className="mb-1" /> Add Word
          </Button>
        </Link>
      </div><br/>

      <Table bordered hover className="table-bordered" style={{ backgroundColor: "#f9f9f9", borderRadius: "10px", overflow: "hidden", border: "2px solid black" }}>
        <thead>
          <tr align="center" style={{ backgroundColor: "#007bff", color: "white", fontSize: "16px" }}>
            <th style={{ padding: "10px" }}>English Word</th>
            <th style={{ padding: "10px" }}>Sinhala Meaning 1</th>
            <th style={{ padding: "10px" }}>Status 1</th>
            <th style={{ padding: "10px" }}>Action 1</th>
            <th style={{ padding: "10px" }}>Sinhala Meaning 2</th>
            <th style={{ padding: "10px" }}>Status 2</th>
            <th style={{ padding: "10px" }}>Action 2</th>
            <th style={{ padding: "10px" }}>Sinhala Meaning 3</th>
            <th style={{ padding: "10px" }}>Status 3</th>
            <th style={{ padding: "10px" }}>Action 3</th>
          </tr>
        </thead>
        <tbody>
          {words.length === 0 ? (
            <tr>
              <td colSpan="10" align="center" style={{ padding: "20px", fontSize: "16px", color: "#555" }}>
                No words available. Add some words!
              </td>
            </tr>
          ) : (
            words.map((word) => (
              <tr key={word._id}>
                <td align="center" style={{ padding: "10px", fontSize: "16px", fontWeight: "bold" }}>{word.englishWord}</td>
                {word.sinhalaMeanings.map((meaning, index) => (
                  <React.Fragment key={index}>
                    <td align="center" style={{ padding: "10px", fontSize: "16px" }}>{meaning}</td>
                    <td align="center" style={{ padding: "10px", fontSize: "16px", textTransform: "capitalize" }}>
                      {word.status ? word.status[index] : "pending"}
                    </td>
                    <td align="center" style={{ padding: "10px", display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="link"
                        className="me-2"
                        disabled={word.status && word.status[index] !== "pending"}
                        onClick={() => handleAccept(word._id, index)}
                      >
                        <IoMdCheckmarkCircleOutline size={24} />
                      </Button>
                      <Button
                        variant="link"
                        disabled={word.status && word.status[index] !== "pending"}
                        onClick={() => handleReject(word._id, index)}
                      >
                        <IoMdCloseCircleOutline size={24} />
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
            <Form.Group controlId="englishWord">
              <Form.Label>English Word</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter English word"
                value={newWord.englishWord}
                onChange={(e) => setNewWord({ ...newWord, englishWord: e.target.value })}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide an English word.
              </Form.Control.Feedback>
            </Form.Group>

            {[0, 1, 2].map(index => (
              <Form.Group controlId={`sinhalaMeaning${index}`} className="mt-3" key={index}>
                <Form.Label>Sinhala Meaning {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter Sinhala meaning ${index + 1}`}
                  value={newWord.sinhalaMeanings[index]}
                  onChange={(e) => handleMeaningChange(index, e.target.value)}
                />
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddWordModal}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Add Word
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default SinhalaDictionary;