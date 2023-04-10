import React from 'react';
import {Github, Linkedin, Discord} from 'react-bootstrap-icons';
import "../App.css"
function Footer() {
  return (
    <div className='footer bg-dark text-light text-center py-2'>
        <div>
        <ul className='list-unstyled mb-1 fs-4 d-flex justify-content-center w-50 mx-auto'>
            <li className='mx-3'><a href="https://github.com/ArxLancifer"><Github /></a></li>
            <li className='mx-3'><a href="https://www.linkedin.com/in/anestis-christoforidis/"><Linkedin /></a></li>
            <li className='mx-3'><a href="https://discordapp.com/users/190929580092162050"><Discord /></a></li>
        </ul>
        </div>
        <h6 className='mb-0'>&copy;Arx_Lancifer</h6>
    </div>
  )
}

export default Footer
