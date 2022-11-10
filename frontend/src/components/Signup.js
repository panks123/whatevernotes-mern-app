import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './css/Signup.css'

const Signup = (props) => {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword:""})

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  const signUpOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    if (json.success) {
      navigate('/login')
      props.showAlert("success", "Account created successfully, Login now")
    }
    else {
      props.showAlert("danger", json.error)
    }
  }

  return (

    <div className="d-flex align-items-center my-4" id="container">
      <div className='d-flex justify-content-center align-items-center' id="signup-box">
        <form className="signup-form my-3" onSubmit={signUpOnSubmit}>
          <div className="head">
            <h2 className='text-center my-2'>WhateverNotes</h2>
            <h6 className='text-center' style={{color: "darkred"}}>Create an account</h6>
          </div>
          <div className="form-group my-2">
            <label htmlFor="name">Name</label>
            <input type="text" autoComplete='' className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} placeholder="Enter name" required />
          </div>
          <div className="form-group my-2">
            <label htmlFor="email">Email address</label>
            <input type="email" autoComplete='' className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" required minLength={5} />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" autoComplete='' className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} placeholder="Enter password" required minLength={5}/>
          </div>
          <div className="form-group my-2">
            <label htmlFor="cpassword">Confirm Password</label>
            <input type="password" autoComplete='' className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} aria-describedby="emailHelp" onChange={onChange} placeholder="Confirm password" required/>
            <div className="passwordmatchmsg" style= {(credentials.cpassword !== "" ?(credentials.password === credentials.cpassword) ? {visibility: "hidden"}: {color: "red", visibility: "visible", background: "rgba(255, 0 , 0, 0.1)"}: {visibility: "hidden"}) }>
              Password and confirm password must match
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled = {credentials.password === credentials.cpassword? false : true}>Signup</button>
          <div className="signup my-2">
            Already have an account?
            <Link className="btn btn-primary mx-1 btn-sm" to="/login" role="button">Login</Link>
          </div>
        </form>
      </div>
    </div >

  )
}

export default Signup;