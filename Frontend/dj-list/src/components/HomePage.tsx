import React from 'react';
import TracksTable from './SubComponents/TracksTable';
import "../App.css"
import { Card } from 'react-bootstrap';
function HomePage() {
  return (
    <div className='homepage border-top border-secondary border-0'>
       <section className='hero-section d-flex flex-column flex-md-row align-items-center justify-content-md-evenly justify-content-center'>
            <div className='col-md-5 col-11'>
                <section className='text-light mx-auto'>
                <img className='memotrack-logo' src={process.env.PUBLIC_URL + '/MemotrackLogo.png'} alt="" />
                    <p><em>Is an application which helps DJs and even common users to have a music list managmement.
                        With some useful features like saving lists by their genre, adding tracks, deleting, editing and saving
                        youtube links to have access on play button anytime.
                        </em>
                    </p>
                </section>
                <section>

                </section>
            </div>
            <div className='hero-table-img col-md-5 col-11'>
                <img className='w-100' src={process.env.PUBLIC_URL + '/heroTable.jpg'} alt="" />
            </div>
       </section>
    </div>
  )
}

export default HomePage
