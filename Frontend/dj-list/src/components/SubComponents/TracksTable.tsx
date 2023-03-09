import React, { Fragment, useEffect, useState} from 'react'
import MaterialReactTable, { MRT_ColumnDef,  MaterialReactTableProps } from 'material-react-table'; 
import { ITrack } from '../../interfaces/UserInterfaces';
import { createTheme, ThemeProvider} from '@mui/material';
import ModalEmbedYoutube from './ModalEmbedYoutube';
import  {Play} from 'react-bootstrap-icons';
import { Button, Container } from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import {setYoutubeLink , modalShow} from '../store/modalState';
import {useParams} from 'react-router-dom';
import useTrackTable from '../../hooks/useTrackTable';
import {useNavigate} from 'react-router-dom';


function TracksTable() {

    const [tracks, setTracks] = useState([])
    
    const {listid} = useParams();
    const {fetchTracks} = useTrackTable();

    const navigate = useNavigate();

    useEffect(()=>{
        //@ts-ignore
        fetchTracks(listid).then(data=> setTracks(data.tracks));
    }, [])
    const dispatch = useDispatch();
    function handleSetLink(e:React.SyntheticEvent<HTMLElement>){
        const linkToYoutube:string = e.currentTarget.dataset.link || "";
        const trackTitle:string = e.currentTarget.dataset.trackTitle || "";
        dispatch<any>(setYoutubeLink({link:linkToYoutube, trackTitle:trackTitle}))
    }


    function fetchListTrack(){
        return null;
    }

    const theme = createTheme({
        palette:{
            mode:"dark",
        },
        components:{
            MuiTableCell:{
                styleOverrides:{
                    root:{
                        color:"#64d86b"
                    }
                },
            },
        }
    })

    const handleSaveRow: MaterialReactTableProps<ITrack>['onEditingRowSave'] =
    async ({ exitEditingMode, row, values }) => {
        console.log(row, values)
      exitEditingMode(); //required to exit editing mode
    };

    const columns:MRT_ColumnDef<ITrack>[] = [
        // {
        //     accessorKey: '_id', //access nested data with dot notation
        //     header: 'user ID',
        //     maxSize:100
        // },
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
        // {
        //     accessorKey: 'youtubeLink', //access nested data with dot notation
        //     header: 'Link',
        //     maxSize:100
        // Cell: ({ cell, row }) => (
        //     <button onClick={(e)=>{handleSetLink(e); dispatch(modalShow())}} className='btn btn-sm btn-danger p-0' data-link={row.original.youtubeLink} data-track-title={row.original.title}>
        //     {row.original.play = 'Play'}
        //     <Play className='fs-5'/>
        //     </button>
        // ),
        // },
        {
            accessorKey: 'play',
            header: 'Play',
            maxSize:80,
            muiTableBodyCellEditTextFieldProps: {
                disabled:true,
                hidden:true
              },
            //or in the component override callbacks like this
            Cell: ({ cell, row }) => (
                <button onClick={(e)=>{handleSetLink(e); dispatch(modalShow())}} className='btn btn-sm btn-danger p-0' data-link={row.original.youtubeLink} data-track-title={row.original.title}>
                {row.original.play = 'Play'}
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
                'data-user-id':row.original._id,
                "data-yourube-link":row.original.youtubeLink
            })}
            renderBottomToolbarCustomActions={({ table }) => {
                
                return (             
                    <Button onClick={()=>navigate('/pushtrack-form', {state:{listid}})} variant='success'>
                        Add Track
                    </Button>      
                );
              }}
            getRowId={(row) => row._id}
            enableDensityToggle={false}
            initialState={{ density: 'compact' }}
            editingMode="modal" //default
            enableEditing
            onEditingRowSave={handleSaveRow}
            // displayColumnDefOptions={{
            //     'mrt-row-actions': {
            //       header: 'Title', //change "Actions" to "Edit"
            //       //use a text button instead of a icon button
            //       Cell: ({ cell, row }) => (
            //         <button onClick={()=>console.log("row",row.id)}  className='btn btn-sm btn-danger p-0' data-link={JSON.stringify(row.getAllCells())}>
            //         Play
            //         <Play className='fs-5'/>
            //         </button>
            //     ),
            //     },
            //   }}
        />
    </ThemeProvider>
    </Container>
  )
}

export default TracksTable
