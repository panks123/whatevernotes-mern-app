import React, {useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import './css/Login.css'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""})

    let navigate = useNavigate();

    const onChange= (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const loginOnSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });

          const json = await response.json()
          if(json.success)
          {
            // store the auth-token to localStorage
            localStorage.setItem('token', json.authToken)
            props.showAlert("success", "Logged in successfully")
            props.updateUserDetailsOnLogin(json.username, json.email);
            localStorage.setItem('username', json.username)
            localStorage.setItem('useremail', json.email)
            navigate('/') // redirect to the Home page
          }
          else
          {
            props.showAlert("danger", json.error)
          }
    }
    return (
        <div className="d-flex align-items-center my-4" id="container">
            <div className='d-flex justify-content-center align-items-center' id="login-box">
                <form id="login-form" onSubmit={loginOnSubmit}>
                    <div className="head">
                        <h2 className='text-center my-2'>WhateverNotes</h2>
                        <h6 className='text-center' style={{color: "darkred"}}>Please login to proceed</h6>
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="email">Email address</label>
                        <input type="email" autoComplete=''  className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" minLength={5} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" autoComplete='' className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} placeholder="Password" minLength={5} required/>
                    </div>
                    <button type="submit" className="btn btn-primary my-3">Login</button>
                    <div className="signup my-2">
                        Don't have an account? 
                        <Link className="btn btn-primary mx-1 btn-sm" to="/signup" role="button">Signup</Link>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default Login
