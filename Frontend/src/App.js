import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/login/Login.jsx";
import LandingPage from "./views/landing/LandingPage.jsx";
import OauthSuccess from "./views/oauthSucces/OauthSuccess.jsx";
import Registration from "./views/registration/Registration.jsx";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/new" element={<NewBlogPost />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/oauth/success" element={<OauthSuccess />} />
        <Route path="/registration" element={<Registration />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
