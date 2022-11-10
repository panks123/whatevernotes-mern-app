import React, {useState} from 'react'
import { Link, useLocation } from "react-router-dom";
import Modal from './Modal';


const Navbar = (props) => {
    let location = useLocation()

    // const reftobtn = useRef(null)

    
    const handleLogoutClick = () => {
        props.showAlert("success", "Logged out successfully")
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('useremail')
    }

    const [openModal, setOpenModal] = useState(false);

    const toggleModal = ()=>{
        openModal === false ? setOpenModal(true): setOpenModal(false); 
    }


    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark" style={{marginBottom: "10px"}}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">WhateverNotes</Link >
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""} mx-1`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""} mx-1`} to="/about">About</Link >
                        </li>
                    </ul>
                    {localStorage.getItem('token') && <form className="d-flex justify-content-end" role="search">
                        <>
                            <Link className="btn btn-primary mx-1 btn-sm" to="/login" onClick={handleLogoutClick} role="button">Logout</Link>
                            <div className=" d-flex user mx-1 justify-content-center align-items-end" onClick={ toggleModal } style={{ width: "31px", height: "31px", backgroundColor: "rgb(1, 120, 90)", borderRadius: "20px", fontWeight: "bold", fontSize: "21px", color: "rgb(224, 224, 222)", cursor: "pointer" }}>{localStorage.getItem('username') ? localStorage.getItem('username').charAt(0).toUpperCase() : "K"}</div>

                            <Modal open={openModal} userDetails = {props.userDetails} handleLogoutClick = { handleLogoutClick } toggleModal= {toggleModal}/>
                        </>
                    </form>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
