import React, { useRef, useState } from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useTrackTable from "../../hooks/useTrackTable";
import {NodePlus} from 'react-bootstrap-icons'


function AddTrackForm() {
    
    const {addTrack} = useTrackTable();



    const trackName = useRef<HTMLInputElement>(null)
    const artistName = useRef<HTMLInputElement>(null)
    const albumName = useRef<HTMLInputElement>(null)
    const youtubeLink = useRef<HTMLInputElement>(null)
    const duration = useRef<HTMLInputElement>(null)
    const BPM = useRef<HTMLInputElement>(null)
    const subGenre = useRef<HTMLInputElement>(null)
    
    
    return (
    <Container className='pt-5'>
    <Form className='w-50 mx-auto mt-5'>
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
        <Form.Control size="sm" placeholder="Link Ref"  />
        <Form.Text ref={youtubeLink} className="text-muted">
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
        <Form.Control ref={BPM} size="sm" />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Sub genre</Form.Label>
        <Form.Control ref={subGenre} size="sm"/>
      </Form.Group>

      <Button variant="primary" className='mt-4'>
        Add track <NodePlus className='fs-5' />
      </Button>

    </Form>
    </Container>
  )
}

export default AddTrackForm
