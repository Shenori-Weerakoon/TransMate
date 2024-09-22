import React, { useState, useEffect, useRef } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { IoMdAddCircleOutline, IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline, IoMdDownload } from "react-icons/io";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { generatePDF } from "../../utils/GeneratePDF";
import './AddToDictionary.css';

export default function ShortFormWord() {
  const [words, setWords] = useState([]);
  const [hover, setHover] = useState(false);

  // Fetch short form words from API
  useEffect(() => {
    const fetchShortFormWords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/words/shortforms'); // Make sure your API URL is correct
        setWords(response.data.data); // Assuming API returns data in the format { data: shortForms }
      } catch (error) {
        console.error('Error fetching short form words:', error);
      }
    };

    fetchShortFormWords();
  }, []);

  // Accept short form word status
  const handleAccept = async (wordId) => {
    // Logic to update status to 'accepted' (e.g., using axios to call API)
  };

  // Reject short form word status
  const handleReject = async (wordId) => {
    // Logic to update status to 'rejected' (e.g., using axios to call API)
  };

  // Delete short form word
  const handleDelete = async (wordId) => {
    // Logic to delete the word (e.g., using axios to call API)
  };

  // Edit word modal handler
  const handleShowEditWordModal = (word) => {
    // Logic to show modal and edit word
  };

  return (
    <div className="container mt-5" style={{ paddingLeft: "0px" }}>
      <h1 className="mb-5 text-center" style={{color:'darkcyan'}}>Short Form Words</h1>


      <div className="d-flex justify-content-between align-items-center mb-4" style={{display:'flex'}}>
        <Link to="/AddToDictionary">
          <Button variant="primary" /*onClick={handleShowAddWordModal}*/ style={{width:'200px', marginRight:'100px'}}>
            <IoMdAddCircleOutline className="mb-1" /> Add Word
          </Button>
        </Link>
          <Button
            className="btn-danger"
            //onClick={downloadAcceptedWordsPDF}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              backgroundColor: hover ? '#3ca341' : 'green',
              borderColor: hover ? '#3ca341' : 'green',
              width:'200px',marginLeft:'-50px',marginRight:'100px'
              
            }}
          >
            <IoMdDownload className="mb-1" /> <span>Download</span>
          </Button>
          <div className="d-flex justify-content-between align-items-center mb-4" style={{ width: '800px' }}>
      {/* Search bar */}
      <Form.Control
          type="text"
          placeholder="Search by Sinhala word, English word, or status..."
          //value={searchQuery}
          //onChange={handleSearch}
        />
      </div>
      </div><br/>
      

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
              <td style={{ padding: "5px", verticalAlign: "middle" }}>{word.status || ''}</td> {/* Directly display status if it's not an array */}
              <td style={{ padding: "0px", verticalAlign: "middle" }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {word.status !== "accepted" && word.status !== "" && (
                    <>
                      <Button variant="success" onClick={() => handleAccept(word._id)} style={{ marginRight: '2px', backgroundColor: '#28a745', color: '#fff', border: 'none' }}>
                        <IoMdCheckmarkCircleOutline />
                      </Button>
                      <Button variant="danger" onClick={() => handleReject(word._id)} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none' }}>
                        <IoMdCloseCircleOutline />
                      </Button>
                    </>
                  )}
                  <Button
                    variant="warning"
                    onClick={() => handleShowEditWordModal(word)}
                    style={{ marginRight: '5px', backgroundColor: '#f0ad4e', borderColor: '#eea236',marginLeft:'5px' }}
                  >
                    <FaEdit style={{ marginRight: '1px' }} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(word._id)}
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
    </div>
  );
}
