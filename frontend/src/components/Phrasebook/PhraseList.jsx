import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Sidebar from "./SideBar"; // Update with the correct path
import AsyncStorage from "@react-native-async-storage/async-storage"; // Consider using localStorage instead
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faPlus,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

function PhraseList() {
  const [phrases, setPhrases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhrases = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId"); // Consider using localStorage
        if (!userId) {
          throw new Error("User ID not found. Please log in again.");
        }

        console.log("Fetching phrases for user ID:", userId);
        const response = await axios.get("http://localhost:5000/phrasebook/", {
          params: { user: userId },
        });

        if (response.data && Array.isArray(response.data)) {
          console.log("Fetched phrases:", response.data);
          setPhrases(response.data);
        } else {
          console.warn("No phrases found or invalid data structure.");
        }
      } catch (error) {
        console.error("Error fetching phrases:", error.message);
        toast.error(error.response?.data?.error || "Failed to fetch phrases");
        navigate("/login");
      }
    };

    fetchPhrases();
  }, [navigate]);

  const handleEdit = (id) => {
    console.log("Editing phrase with ID:", id);
    if (id) {
      navigate(`/phrasebook/update/${id}`);
    } else {
      console.error("ID is undefined, cannot navigate.");
      toast.error("Cannot edit phrase. ID is undefined.");
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting phrase with ID:", id);
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      await axios.delete(`http://localhost:5000/phrasebook/delete/${id}`, {
        data: { user: userId },
      });

      setPhrases((prevPhrases) => prevPhrases.filter((phrase) => phrase._id !== id));
      console.log("Phrase deleted successfully!");
      toast.success("Phrase deleted successfully!");
    } catch (error) {
      console.error("Error deleting phrase:", error.response?.data?.error || error);
      toast.error("Failed to delete phrase");
    }
  };

  const handleClickNewPhrase = () => {
    navigate("/phrasebook/add");
  };

  const handleClickBackHome = () => {
    navigate("/PhrasebookHome");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("phrasebook-table");

    const actionButtons = document.querySelectorAll(".action-button");
    actionButtons.forEach((button) => {
      button.style.display = "none";
    });

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0];
      const formattedTime = currentDate.toLocaleTimeString().replace(/:/g, "-");

      const filename = `Phrasebook_List_Report_${formattedDate}_${formattedTime}.pdf`;
      pdf.save(filename);
      toast.success("PDF report downloaded successfully!");

      actionButtons.forEach((button) => {
        button.style.display = "inline-block";
      });
    });
  };

  const filteredPhrases = phrases.filter((phrase) =>
    Object.values(phrase).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="d-flex">
      <div style={{ width: '250px' }}>
        <Sidebar />
      </div>
      <div className="flex-fill">
        <div className="container-fluid">
          <h2 className="text-center mb-4">Phrases</h2>
          <div className="search-container mb-4 d-flex align-items-center">
            <input
              type="text"
              className="form-control search-input me-2"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              style={{ flex: 1 }} // Make the search bar take available space
            />
            <div className="d-flex">
              <button
                className="btn btn-primary btn-sm me-2"
                type="button"
                onClick={handleClickNewPhrase}
              >
                <FontAwesomeIcon icon={faPlus} /> Add Phrase
              </button>
              <button
                className="btn btn-primary btn-sm"
                type="button"
                onClick={handleDownloadPDF}
              >
                <FontAwesomeIcon icon={faFilePdf} /> Download PDF
              </button>
            </div>
          </div>
          <table id="phrasebook-table" className="table table-striped">
            <thead>
              <tr>
                <th>Phrase ID</th>
                <th>Phrase</th>
                <th>Translation</th>
                <th>Language</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPhrases.length > 0 ? (
                filteredPhrases.map((phrase) => {
                  console.log("Phrase:", phrase);
                  console.log("Phrase ID:", phrase._id);
                  return (
                    <tr key={phrase._id}>
                      <td>{phrase._id}</td>
                      <td>{phrase.phrase}</td>
                      <td>{phrase.translation}</td>
                      <td>{phrase.language}</td>
                      <td>
                        <div className="d-flex">
                          <button
                            className="btn btn-success btn-sm me-1 action-button"
                            onClick={() => handleEdit(phrase._id)} 
                          >
                            <FontAwesomeIcon icon={faEdit} /> Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm action-button"
                            onClick={() => handleDelete(phrase._id)} 
                          >
                            <FontAwesomeIcon icon={faTrashAlt} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No phrases found.</td>
                </tr>
              )}
            </tbody>
          </table>
          <button
            className="btn btn-primary btn-sm float-end"
            onClick={handleClickBackHome}
          >
            Back to Home
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PhraseList;
