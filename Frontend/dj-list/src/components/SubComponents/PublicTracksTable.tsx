import React, {useEffect, useState} from 'react'
import MaterialReactTable, { MRT_ColumnDef} from 'material-react-table'; 
import { ITrack } from '../../interfaces/UserInterfaces';
import { createTheme, ThemeProvider} from '@mui/material';
import ModalEmbedYoutube from './ModalEmbedYoutube';
import  {Play} from 'react-bootstrap-icons';
import {Container} from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import {setYoutubeLink , modalShow} from '../store/modalState';
import {useParams} from 'react-router-dom';
import useTrackTable from '../../hooks/useTrackTable';
import {useNavigate} from 'react-router-dom';
import '../../App.css'



function PublicTracksTable() {

    const [tracks, setTracks] = useState<ITrack[]>([]);
    const {listid} = useParams();
    const {fetchTracks} = useTrackTable();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!tracks.length){
            //@ts-ignore
            fetchTracks(listid).then(data=> setTracks(data.tracks));
        }
    }, [tracks])

    function handleSetLink(e:React.SyntheticEvent<HTMLElement>){
        const linkToYoutube:string = e.currentTarget.dataset.link || "";
        const trackTitle:string = e.currentTarget.dataset.trackTitle || "";
        dispatch<any>(setYoutubeLink({link:linkToYoutube, trackTitle:trackTitle}))
    }



    const theme = createTheme({
        palette:{
            mode:"dark",
        },
        components:{
            MuiTableCell:{
                styleOverrides:{
                    head:{
                        color:"#00BFA5"
                    }
                }
            },
            MuiToolbar:{
                styleOverrides:{
                    gutters:{
                        borderRadius:"5px",
                    }
                }
            },
            MuiPaper:{
                styleOverrides:{
                   root:{
                    borderRadius:"10px"
                   }
                }
            }
        }
    })
    
    
    const columns:MRT_ColumnDef<ITrack>[] = [
       
        {
            accessorKey: 'title', //access nested data with dot notation
            header: 'Title',
            maxSize:140,
            
        },
        {
            accessorKey: 'artist', //access nested data with dot notation
            header: 'Artist',
            maxSize:120
        },
        {
            accessorKey: 'album', //access nested data with dot notation
            header: 'Album',
            maxSize:160,
        },
        {
            accessorKey: 'BPM', //access nested data with dot notation
            header: 'BPM',
            maxSize:40
        },
        {
            accessorKey: 'duration', //access nested data with dot notation
            header: 'Duration',
            maxSize:40,
        },
        {
            accessorKey: 'youtubeLink', //access nested data with dot notation
            header: 'Link',
            maxSize:100,
        Cell: ({ cell, row }) => (
            <button onClick={(e)=>{handleSetLink(e); dispatch(modalShow())}} className='btn btn-sm btn-danger py-0 px-1' data-link={row.original.youtubeLink} data-track-title={row.original.title}>
            <span className='ps-1'>Play</span>
            <Play className='fs-5'/>
            </button>
        ),
        },
        {
            accessorKey: 'subGenre', //access nested data with dot notation
            header: 'Sub genre',
            maxSize:100,
        },
    ]
    
  return (
    
    <Container className='mt-5 pt-5'>
        <ModalEmbedYoutube />
    <ThemeProvider theme={theme}>
        <MaterialReactTable
            columns={columns} data={tracks}
            muiTableBodyCellProps={{sx:{fontSize:"0.85rem"}}}

            //@ts-ignore
            muiTableBodyRowProps={({row})=>({
                'data-track-id':row.original._id,
                "data-yourube-link":row.original.youtubeLink
            })}
            getRowId={(row) => row._id}
            enableDensityToggle={false}
            initialState={{ density: 'compact' }}
        />
    </ThemeProvider>
    </Container>
  )
}

export default PublicTracksTable
