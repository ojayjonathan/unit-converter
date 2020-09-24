import "./Navbar.css"
import React from 'react'




export  function NavToggle() {
    return (
        <div className="navbar__toggle" id="sideNav">
            <button className="navClose" onClick={()=>{
                document.getElementById('sideNav').classList.remove('nav-active')
            }}>&times;</button>
             <ul>
                <li><a href="/Weight">Weight</a></li>
                
                <li><a href="/length">length</a></li> 
               
                <li><a href="/temperature">Temperature</a></li>
                
                <li><a href="/time">Time</a></li> 

                <li><a href="/currency">Currency</a></li>
                
             </ul>
        </div>
    )
}


function Navbar() {
    return (
        <div className="navbar">
            <button className="navOpen" onClick={()=>{
                document.getElementById('sideNav').classList.add('nav-active')
            }}></button>
            <h1><a href="/" >
             Unit Convertor </a>
            </h1>   
    </div>
    )
}

export default Navbar
