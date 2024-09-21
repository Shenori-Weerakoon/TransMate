import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from '../components/Home';
import Translator from '../components/Home/Translator';
import Dictionary from '../components/Home/Dictionary';
import Login from '../components/Login/index';
import AdminSideBar from '../components/Admin/AdminSideBar';
import SinhalaDictionary from '../components/Admin/SinhalaDictionary';
import AddToDictionary from '../components/Admin/AddToDictionary';
import EditDictionary from '../components/Admin/EditDictionary';
import TranslationList from '../components/User/TranslationList';
import EditTranslationForm from '../components/User/EditTranslationForm';


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
                <Route path="/editDictionary/:id" element={<EditDictionary />} />
                <Route path="/translationList" element={<TranslationList />} /> 
                <Route path="/translationForm" element={<EditTranslationForm />} />                    
            </Routes>
        </Router>
    </>
  )
}

export default AppRoutes;