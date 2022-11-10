import React from 'react';
import './css/About.css'

export default function About() {
  
  return (
    <div className= "container">
        <h2 className='mx-5'>Thank you for taking time to check out <em>WhateverNotes</em></h2>
        <hr />
        <div className="about-paras">
          <p className='p1'>Hey There!</p>
          <p className='p2'><em>Whatever</em> was created as a personal project by myself, <em>Pankaj Kumar</em>.</p>
          <p className='p3'>My main goal with this project was to jump into furthering my React skills with my most technically ambitious project yet, and I also really wanted to create a project that incorporated some sort of database - since everything I've created up until this point has been static.</p>
          <p className='p4'>I chose MERN as the stack for building this project, I got down to coding, built it and deployed to production!</p>
          <p className='p5'>The learning experience that this project has presented has been phenomenal to my growth as a web developer. I was able to learn and incorporate frontend-backend connection, mongoDB connection with Atlas, JWT authentication and more... Alongside this, I was able to learn more about how React and the different types of React hooks work.</p>
          <p className='p6'>Thank you again for taking the time to check out <em>WhateverNotes</em>. I truly hope you like what I've created here!</p>
          <p className="p7">
            All the best,
            <br />
            Pankaj Kumar
          </p>
        </div>
        <hr className='my-4'/>
        <p className='disclaimer my-4'>
            <strong>Disclaimer: </strong> This project is definitely not fool-proof. It should function perfectly fine under normal usage, but this web app should be seen as a personal project by an individual, not a production-ready note application with the absolute minimal chance of app-breaking bugs appearing.
        </p>
    </div>
  )
}
