import axios from 'axios'
import React from 'react'
import {ITrack} from '../interfaces/UserInterfaces'
function TrackTableHook(props:{listId:string, trackToAdd:ITrack}) {
  function fetchTracks(){
    const response = axios.get(``)
  }
}

export default TrackTableHook
