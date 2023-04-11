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
                    <p><em>Is an application that helps DJs and even casual users manage their music playlists. It includes useful features such as the ability to save lists by genre, add and delete tracks, edit existing playlists, and save YouTube links for easy access to the play button anytime.
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
                <h5 className='text-light w-75 text-center mx-auto py-4'>Check out some of the great features that MEMOTRACK offers to help you manage your music playlists. You can discuss your playlists with other people and receive feedback, as well as discover awesome playlists from other MEMOTRACK users.
                </h5>
                
                <div>
                    <section className='d-md-flex justify-content-between p-4'>
                    <Card className='home-card col-md-3 my-2'>
                        <Card.Img variant="top" src={process.env.PUBLIC_URL + '/publicLists.jpg'} />
                        <Card.Body  className='bg-dark rounded-0 rounded-bottom text-light'>
                        <Card.Title>Search for lists</Card.Title>
                        <Card.Text>
                        You can easily search for public playlists created by other users based on the name of the playlist or its genre.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='home-card col-md-3 my-2'>
                        <Card.Img variant="top" src={process.env.PUBLIC_URL + '/commentList.jpg'} />
                        <Card.Body className='bg-dark rounded-0 rounded-bottom text-light'>
                        <Card.Title>Discuss about list</Card.Title>
                        <Card.Text>
                        You can discuss playlists in the comments section, provide feedback to the creator of the playlist, like the playlist, or even add it to your favorites.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='home-card col-md-3 my-2'>
                        <Card.Img variant="top" src={process.env.PUBLIC_URL + '/listModal.jpg'} />
                        <Card.Body className='bg-dark rounded-0 rounded-bottom text-light'>
                        <Card.Title>YouTube Modal </Card.Title>
                        <Card.Text>
                            MEMOTRACK provides YouTube modal integration so that users can listen to their saved tracks directly from the playlist.
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
