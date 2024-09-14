import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from '../components/Home';
import Translator from '../components/Home/Translator';
import Dictionary from '../components/Home/Dictionary';
import Login from '../components/Login/index';
import AdminSideBar from '../components/Admin/AdminSideBar';
import SinhalaDictionary from '../components/Admin/SinhalaDictionary';
import AddToDictionary from '../components/Admin/AddToDictionary';
import TranslationList from '../components/User/TranslationList';
import EditTranslationForm from '../components/User/EditTranslationForm';
import AddPhrase from '../components/Phrasebook/AddPhrase';
import EditPhrase from '../components/Phrasebook/EditPhrase';
import PhraseList from '../components/Phrasebook/PhraseList';
import PhrasebookHome from '../components/Phrasebook/PhrasebookHome';
import Register from '../components/Register/index';


const AppRoutes = () => {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/translator" element={<Translator />} />
                <Route path="/dictionary" element={<Dictionary />} />
                <Route path="/login" element={<Login />} />   
                <Route path="/admin" element={<AdminSideBar />} />             
                <Route path="/SinhalaDictionary" element={<SinhalaDictionary />} />             
                <Route path="/AddToDictionary" element={<AddToDictionary />} />
                <Route path="/translationList" element={<TranslationList />} /> 
                <Route path="/translationForm" element={<EditTranslationForm />} />   
                <Route path="/phrasebook/add" element={<AddPhrase/>} /> 
                <Route path="/phrasebook/update/:Id" element={<EditPhrase />} /> 
                <Route path="/phrasebook/" element={<PhraseList/>} />  
                <Route path="/PhrasebookHome" element={<PhrasebookHome/>} /> 
                <Route path="/register" element={<Register />} />                   
            </Routes>
        </Router>
    </>
  )
}

export default AppRoutes;