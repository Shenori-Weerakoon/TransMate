import React, { useState, useEffect } from "react";
import { Button, Table, Form } from "react-bootstrap";
import { IoMdAddCircleOutline, IoMdDownload, IoMdCloseCircleOutline, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from "axios";
import './AddToDictionary.css'; // Import your CSS file for styling

export default function ShortFormWord() {
  const [words, setWords] = useState([]);
  const [hover, setHover] = useState(false);
  const [showAddWordForm, setShowAddWordForm] = useState(false);
  const [newWord, setNewWord] = useState({ shortForm: '', fullForm: '', status: 'pending' });
  const [currentWordId, setCurrentWordId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all short form words from API
  useEffect(() => {
    const fetchShortFormWords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/words/shortforms');
        setWords(response.data.data);
      } catch (error) {
        console.error('Error fetching short form words:', error);
      }
    };

    fetchShortFormWords();
  }, []);

  // Handle Add or Update Word Form submission
  const handleAddOrUpdateWord = async () => {
    try {
      if (currentWordId) {
        // Update existing word
        const response = await axios.put(`http://localhost:5000/words/shortforms/${currentWordId}`, newWord);
        setWords(words.map(word => (word.shortForm === currentWordId ? response.data.data : word)));
      } else {
        // Add new word
        const response = await axios.post('http://localhost:5000/words/shortforms', newWord);
        setWords([...words, response.data.data]);
      }

      // Reset state
      setNewWord({ shortForm: '', fullForm: '', status: 'pending' });
      setCurrentWordId(null);
      setShowAddWordForm(false);
    } catch (error) {
      console.error('Error saving short form word:', error);
    }
  };

  const handleEditWord = (word) => {
    setNewWord({ shortForm: word.shortForm, fullForm: word.fullForm, status: word.status });
    setCurrentWordId(word.shortForm);
    setShowAddWordForm(true);
  };

  const handleDeleteWord = async (shortForm) => {
    try {
      await axios.delete(`http://localhost:5000/words/shortforms/${shortForm}`);
      setWords(words.filter(word => word.shortForm !== shortForm));
    } catch (error) {
      console.error('Error deleting short form word:', error);
    }
  };

  const handleApproveReject = async (shortForm, action) => {
    try {
      const updatedStatus = action === 'approve' ? 'approved' : 'rejected';
      const response = await axios.put(`http://localhost:5000/words/shortforms/${shortForm}`, { status: updatedStatus });
      setWords(words.map(word => (word.shortForm === shortForm ? response.data.data : word)));
    } catch (error) {
      console.error('Error changing short form status:', error);
    }
  };

  // Filtered words based on search term
  const filteredWords = words.filter(word => 
    word.shortForm.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.fullForm.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5" style={{ paddingLeft: "0px" }}>
      <h1 className="mb-5 text-center" style={{ color: 'darkcyan' }}>Short Form Words</h1>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button 
          variant="primary" 
          onClick={() => setShowAddWordForm(true)}
          style={{ width: '200px', marginRight: '100px' }}
        >
          <IoMdAddCircleOutline className="mb-1" /> Add Word
        </Button>

        <Button
          className="btn-danger"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            backgroundColor: hover ? '#3ca341' : 'green',
            borderColor: hover ? '#3ca341' : 'green',
            width: '200px', marginLeft: '-50px', marginRight: '100px'
          }}
        >
          <IoMdDownload className="mb-1" /> <span>Download</span>
        </Button>

        <Form.Control
          type="text"
          placeholder="Search by short form or full form..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table bordered hover className="table-bordered" style={{ backgroundColor: "#f9f9f9", borderRadius: "10px", overflow: "hidden", border: "2px solid black", width: "100%", tableLayout: "fixed" }}>
        <thead>
          <tr align="center" style={{ backgroundColor: "darkcyan", color: "white", fontSize: "13px" }}>
            <th style={{ padding: "5px", width: "5%" }}>Short Form Word</th>
            <th style={{ padding: "10px", width: "10%" }}>Full Form</th>
            <th style={{ padding: "6px", width: "5%" }}>Status</th>
            <th style={{ padding: "0px", width: "5%" }}>Action</th>
          </tr>
        </thead>
        <tbody align="center" style={{ backgroundColor: "#e9ecef", fontSize: "12px" }}>
          {filteredWords.map(word => (
            <tr key={word.shortForm}>
              <td style={{ padding: "5px", verticalAlign: "middle" }}>{word.shortForm}</td>
              <td style={{ padding: "5px", verticalAlign: "middle" }}>{word.fullForm}</td>
              <td style={{ padding: "5px", verticalAlign: "middle" }}>{word.status || ''}</td>
              <td style={{ padding: "0px", verticalAlign: "middle" }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {word.status === 'pending' && (
                    <>
                      <Button
                        variant="success"
                        style={{ marginRight: '2px', backgroundColor: '#28a745', color: '#fff', border: 'none' }}
                        onClick={() => handleApproveReject(word.shortForm, 'approve')}
                      >
                        <IoMdCheckmarkCircleOutline />
                      </Button>
                      <Button
                        variant="danger"
                        style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none' }}
                        onClick={() => handleApproveReject(word.shortForm, 'reject')}
                      >
                        <IoMdCloseCircleOutline />
                      </Button>
                    </>
                  )}
                  <Button
                    variant="warning"
                    style={{ marginRight: '5px', backgroundColor: '#f0ad4e', borderColor: '#eea236', marginLeft: '5px' }}
                    onClick={() => handleEditWord(word)}
                  >
                    <FaEdit style={{ marginRight: '1px' }} />
                  </Button>
                  <Button
                    variant="danger"
                    style={{ backgroundColor: '#d9534f', borderColor: '#d43f3a' }}
                    onClick={() => handleDeleteWord(word.shortForm)}
                  >
                    <FaTrash style={{ marginRight: '0px' }} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Floating Form */}
      {showAddWordForm && (
        <div className="overflow-form"
          style={{
            border: '1px solid black',
            backgroundColor: 'rgba(255,255,255,0.9)',
            position: 'fixed',
            top: '40%',
            left: '40%',
            width: '400px',
            maxHeight: '400px',
            overflowY: 'auto',
            zIndex: 1050,
            boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
            padding: '20px',
            borderRadius: '8px',
          }}>
          <center><h5>{currentWordId ? 'Edit Short Form Word' : 'Add New Short Form Word'}</h5></center>

          <MdCancel
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer',
              color: '#dc3545',
              fontSize: '24px'
            }} onClick={() => { setShowAddWordForm(false); setCurrentWordId(null); }} />

          <Form>
            <Form.Group>
              <Form.Label>Short Form</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter short form"
                value={newWord.shortForm}
                onChange={(e) => setNewWord({ ...newWord, shortForm: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Full Form</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full form"
                value={newWord.fullForm}
                onChange={(e) => setNewWord({ ...newWord, fullForm: e.target.value })}
              />
            </Form.Group>
            <Button 
              variant="primary" 
              onClick={handleAddOrUpdateWord}
            >
              {currentWordId ? 'Update Word' : 'Add Word'}
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}
