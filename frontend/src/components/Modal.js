import React from 'react'
import './css/Modal.css'
import { Link } from 'react-router-dom'
const Modal = (props) => {
    const handleModalLogoutClick = ()=>{
        props.toggleModal();
        props.handleLogoutClick();
    }

    window.onclick = (e)=>{
        if(e.target.className === 'modalContainer'){
            props.toggleModal();
        }
    }

    if (!props.open) {
        return null
    }
    return (
        
            <div className="modalContainer">
                <div className="popup">
                    <div className="modal-header d-flex justify-content-end">
                        
                        <button type="button" className="close" data-dismiss="modal" onClick={()=>{props.toggleModal()}} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-header d-flex justify-content-center">
                        <h5 className="modal-title text-center px-2" >Logged in as: </h5>
                    </div>
                    <div className="modal-body my-3">
                        <div className="user-logo d-flex justify-content-center">
                            <div className=" d-flex user mx-1 my-1 justify-content-center align-items-end" style={{ width: "46px", height: "46px", backgroundColor: "rgb(1, 120, 90)", borderRadius: "27px", fontWeight: "bold", fontSize: "31px", color: "rgb(224, 224, 222)" }}>{localStorage.getItem('username') ? localStorage.getItem('username').charAt(0).toUpperCase() : "K"}</div>
                        </div>
                        <h4 className='text-center'>{localStorage.getItem('username')}</h4>
                        <div className="email text-center px-3">{localStorage.getItem('useremail')}</div>
                    </div>
                    <div className="d-flex justify-content-center my-4">
                        <Link className="btn btn-primary mx-1 btn-sm" to="/login" onClick={handleModalLogoutClick} role="button">Logout</Link>
                    </div>
                </div>
            </div>
        
    )
}

export default Modal
