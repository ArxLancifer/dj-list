import axios, { AxiosResponse } from 'axios'
import React from 'react'
import {ITrack} from '../interfaces/UserInterfaces'
function TrackTableHook() {
  async function fetchTracks(listId?:string){
    const response = await axios.get<AxiosResponse>(`http://localhost:5000/userlists/gettracks/${listId}`)
    const data = response.data;
    return data;
  }
  function testHook(){
    console.log("hook is working");
  }
  return {fetchTracks, testHook}
}

export default TrackTableHook
