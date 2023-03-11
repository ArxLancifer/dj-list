import React from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
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

    async function editTrack(listId:string, trackId:string, editedTrack:INewTrack){
        // const response = await axios.put(`http://localhost:5000/userlists/updatetrack/${listId}/${trackId}`, {values:editedTrack})

        try {
            const response = await axios.put<AxiosResponse>(`http://localhost:5000/userlists/updatetrack/${listId}/${trackId}`, {values:editedTrack});
            return response.data;
          } catch (error) {
              if (axios.isAxiosError(error)) {
                console.log(error.response?.data)
            }
            return (error as AxiosError).response?.data;
          }
            
        
    }
    async function deleteTrack(listId:string, trackId:string) {

        try {
            const response = await axios.delete<AxiosResponse>(`http://localhost:5000/userlists/updatetrack/${listId}/${trackId}`);
            return response.data;
          } catch (error) {
              if (axios.isAxiosError(error)) {
                console.log(error.response?.data)
            }
            return (error as AxiosError).response?.data;
          } 
          
    }

    return {fetchTracks, addTrack, editTrack, deleteTrack}
}

    

export default TrackTableHook
