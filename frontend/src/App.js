import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Footer from './components/Footer';

function App() {
  const [alert, setAlert] = useState({type:"",msg:"", zindex: -1})
  const [userDetails, setUserDetails] = useState({name: "", email: ""})

  const updateUserDetailsOnLogin = (name, email)=>{
    setUserDetails({name, email})
  }

  const showAlert = (type,msg)=>{
    setAlert({
      type: type,
      message: msg,
      zindex: 2
    })
    
    setTimeout(()=>{
      setAlert({type:"",msg:"", zindex: -1})
      
    },2000)
  }

  return (
    <>
    <NoteState>
      <Router>  
        <Navbar userDetails = {userDetails} showAlert={showAlert}/>
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />}/>
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/login" element={<Login showAlert={showAlert}  updateUserDetailsOnLogin = {updateUserDetailsOnLogin}/>}/>
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />}/>
          </Routes>
        </div>
        <Footer/>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
