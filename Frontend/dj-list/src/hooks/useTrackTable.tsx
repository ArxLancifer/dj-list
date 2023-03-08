import React from 'react'
import axios, { AxiosResponse } from 'axios'
import {INewTrack} from '../interfaces/UserInterfaces'
function TrackTableHook() {
  async function fetchTracks(listId:string){
    const response = await axios.get<AxiosResponse>(`http://localhost:5000/userlists/gettracks/${listId}`)
    const data = response.data;
    return data;
  }

  async function addTrack(listId:string,track:INewTrack){
         try {

             const response = await axios.post<AxiosResponse>(`http://localhost:5000/userlists/pushtrack/${listId}`, track)
             const data = response.data;
              console.log(data)  
         } catch (error) {
            console.log(error)
            console.log("Track failed to be add");
         }
}
    return {fetchTracks, addTrack}
}
export default TrackTableHook
