import React, { useState, useEffect } from "react";
import { Button, Table, Form } from "react-bootstrap";
import { IoMdAddCircleOutline, IoMdDownload, IoMdCloseCircleOutline, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from "axios";
import './AddToDictionary.css'; // Import the CSS file for styling

export default function ShortFormWord() {
  const [words, setWords] = useState([]);
  const [hover, setHover] = useState(false);
  const [showAddWordForm, setShowAddWordForm] = useState(false); // Control form visibility
  const [newWord, setNewWord] = useState({ shortForm: '', fullForm: '', status: 'pending' });

  // Fetch short form words from API
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

  // Handle Add Word Form submission
  const handleAddWord = async () => {
    try {
      const response = await axios.post('http://localhost:5000/words/shortforms', newWord);
      setWords([...words, response.data.data]); // Add new word to the list
      setShowAddWordForm(false); // Hide the form after submission
    } catch (error) {
      console.error('Error adding short form word:', error);
    }
  };

  return (
    <div className="container mt-5" style={{ paddingLeft: "0px" }}>
      <h1 className="mb-5 text-center" style={{color:'darkcyan'}}>Short Form Words</h1>

      <div className="d-flex justify-content-between align-items-center mb-4" style={{display:'flex'}}>
        <Button 
          variant="primary" 
          onClick={() => setShowAddWordForm(true)} // Show form when clicked
          style={{width:'200px', marginRight:'100px'}}
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
            width:'200px', marginLeft:'-50px', marginRight:'100px'
          }}
        >
          <IoMdDownload className="mb-1" /> <span>Download</span>
        </Button>

        <div className="d-flex justify-content-between align-items-center mb-4" style={{ width: '800px' }}>
          <Form.Control
            type="text"
            placeholder="Search by Sinhala word, English word, or status..."
          />
        </div>
      </div>

      <Table bordered hover className="table-bordered" style={{ backgroundColor: "#f9f9f9", borderRadius: "10px", overflow: "hidden", border: "2px solid black", width: "100%", tableLayout: "fixed" }}>
        <thead>
          <tr align="center" style={{ backgroundColor: "darkcyan", color: "white", fontSize: "13px" }}>
            <th style={{ padding: "5px", width: "5%" }}>Short Form Word</th>
            <th style={{ padding: "10px", width: "10%" }}>Extract Word</th>
            <th style={{ padding: "6px", width: "5%" }}>Status</th>
            <th style={{ padding: "0px", width: "5%" }}>Action</th>
          </tr>
        </thead>
        <tbody align="center" style={{ backgroundColor: "#e9ecef", fontSize: "12px" }}>
          {words.map(word => (
            <tr key={word._id}>
              <td style={{ padding: "5px", verticalAlign: "middle" }}>{word.shortForm}</td>
              <td style={{ padding: "5px", verticalAlign: "middle" }}>{word.fullForm}</td>
              <td style={{ padding: "5px", verticalAlign: "middle" }}>{word.status || ''}</td>
              <td style={{ padding: "0px", verticalAlign: "middle" }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button variant="success"  style={{ marginRight: '2px', backgroundColor: '#28a745', color: '#fff', border: 'none' }}>
                        <IoMdCheckmarkCircleOutline />
                      </Button>
                      <Button variant="danger" style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none' }}>
                        <IoMdCloseCircleOutline />
                      </Button>
                  
                  <Button
                    variant="warning"
                    style={{ marginRight: '5px', backgroundColor: '#f0ad4e', borderColor: '#eea236', marginLeft:'5px' }}
                  >
                    <FaEdit style={{ marginRight: '1px' }} />
                  </Button>
                  <Button
                    variant="danger"
                    style={{ backgroundColor: '#d9534f', borderColor: '#d43f3a' }}
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
          border:'1px solid black',
          backgroundColor:'rgba(255,255,255,0.9)',
          position:'fixed',
          top:'40%',
          left:'40%',
          width:'400px',
          maxHeight:'400px',
          overflowY:'auto',
          zIndex:1050,
          boxShadow:'opx 4px 8px rgba(0,0,0,0.1)',
          padding:'20px',
          borderRadius:'8px',
        }}>
          <center><h5>Add New Short Form Word</h5></center>
          
          
          <MdCancel 
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
            color: '#dc3545', // Red color to indicate cancellation
            fontSize: '24px'
          }}onClick={() => setShowAddWordForm(false)} />
              
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
            <div className="d-flex justify-content-end">
              
              <Button variant="primary" onClick={handleAddWord} className="ml-2">
                Save
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
