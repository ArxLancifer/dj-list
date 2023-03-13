import React from 'react';
import {Github, Linkedin, Discord} from 'react-bootstrap-icons';
import "../App.css"
function Footer() {
  return (
    <div className='bg-dark text-light text-center'>
        <h5>&copy;Arx_Lancifer</h5>
        <div>
        <ul className='list-unstyled fs-4 mb-0 d-flex justify-content-center w-50 mx-auto'>
            <li className='mx-3'><a href="https://github.com/ArxLancifer"><Github /></a></li>
            <li className='mx-3'><a href="https://www.linkedin.com/in/anestis-christoforidis/"><Linkedin /></a></li>
            <li className='mx-3'><a href="https://discordapp.com/users/190929580092162050"><Discord /></a></li>
        </ul>
        </div>
    </div>
  )
}

export default Footer
