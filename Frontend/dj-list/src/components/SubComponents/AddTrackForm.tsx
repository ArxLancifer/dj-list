import React, { useRef, useState } from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useTrackTable from "../../hooks/useTrackTable";
import {NodePlus} from 'react-bootstrap-icons'
import { INewTrack } from '../../interfaces/UserInterfaces';
import { useLocation, useNavigate } from 'react-router-dom';


function AddTrackForm() {
    
    const {addTrack} = useTrackTable();
    const location = useLocation();
    const navigate = useNavigate();
    const listId = location.state.listid;
    
    const trackName = useRef<HTMLInputElement>(null)
    const artistName = useRef<HTMLInputElement>(null)
    const albumName = useRef<HTMLInputElement>(null)
    const youtubeLink = useRef<HTMLInputElement>(null)
    const duration = useRef<HTMLInputElement>(null)
    const BPM = useRef<HTMLInputElement>(null)
    const subGenre = useRef<HTMLInputElement>(null)
    
    function handleAddTrack(){
        const track:INewTrack = {
            title:trackName.current?.value || "",
            artist:artistName.current?.value || "",
            album:albumName.current?.value || "",
            subGenre:subGenre.current?.value || "Not available",
            duration:duration.current?.value || "",
            BPM:BPM.current?.value || "",
            youtubeLink:youtubeLink.current?.value || "",
        }

        for (let field in track) {
            if(track[`${field}` as keyof INewTrack].length < 2){
                console.log("Error msg fields must have more than 1 values")
                return ;
            }
          }


        addTrack(listId, track)

        navigate(`/trackstable/${listId}`);
    }
    
    return (
    <Container className='pt-5'>
    <Form className='w-50 mx-auto mt-5 p-4 border border-secondary rounded text-light'>
      <Form.Group className="mb-2">
        <Form.Label>Track name</Form.Label>
        <Form.Control ref={trackName} size="sm" placeholder="Required field"/>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Artist</Form.Label>
        <Form.Control ref={artistName} size="sm" placeholder="Required field" />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Album</Form.Label>
        <Form.Control ref={albumName} size="sm" placeholder="Required field" />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Youtube Link</Form.Label>
        <Form.Control ref={youtubeLink} size="sm" placeholder="Link Ref"  />
        <Form.Text  className="text-muted">
        Copy and paste the youtube link that refers to this track.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Duration</Form.Label>
        <Form.Control ref={duration} size="sm" placeholder="Required field" />
        <Form.Text className="text-muted">
        Proper duration format. *example 4:20
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>BPM</Form.Label>
        <Form.Control type="number" ref={BPM} size="sm" />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Sub genre</Form.Label>
        <Form.Control ref={subGenre} size="sm"/>
      </Form.Group>

      <Button onClick={handleAddTrack} className='btn-createlist border-0'>
        Add track <NodePlus className='fs-5' />
      </Button>

    </Form>
    </Container>
  )
}

export default AddTrackForm
