import React from 'react';
import TracksTable from './SubComponents/TracksTable';
import "../App.css"
import { Card } from 'react-bootstrap';
function HomePage() {
  return (
    <div className='homepage'>
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
                <img className='w-100' src={process.env.PUBLIC_URL + '/listDemo.jpg'} alt="" />
            </div>
       </section>
       <hr />
            <section className='demo-section'>
                <h5 className='text-light w-75 text-center mx-auto py-4'>Check out some great features that MEMOTRACK will help you to manage you lists , discusse with other people and get
                    feedback about your list, and find more awasome lists from other MEMOTRACK users.
                </h5>
                
                <div>
                    <section className='d-md-flex justify-content-between p-4'>
                    <Card className='home-card col-md-3 my-2'>
                        <Card.Img variant="top" src={process.env.PUBLIC_URL + '/publicLists.jpg'} />
                        <Card.Body  className='bg-dark rounded-0 rounded-bottom text-light'>
                        <Card.Title>Search for lists</Card.Title>
                        <Card.Text>
                            You can search all public lists from other users, based on name or genre
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='home-card col-md-3 my-2'>
                        <Card.Img variant="top" src={process.env.PUBLIC_URL + '/commentList.jpg'} />
                        <Card.Body className='bg-dark rounded-0 rounded-bottom text-light'>
                        <Card.Title>Discuss about list</Card.Title>
                        <Card.Text>
                            You can have discussion about list in comments, give to user who created that list a feedback, like that list or even
                            add it to you favorites.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='home-card col-md-3 my-2'>
                        <Card.Img variant="top" src={process.env.PUBLIC_URL + '/listModal.jpg'} />
                        <Card.Body className='bg-dark rounded-0 rounded-bottom text-light'>
                        <Card.Title>YouTube Modal </Card.Title>
                        <Card.Text>
                            MEMOTRACK provides you YouTube modal integration so user can listen their saved tracks 
                            directly from list.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </section>
                </div>
            </section>
    </div>
  )
}

export default HomePage
