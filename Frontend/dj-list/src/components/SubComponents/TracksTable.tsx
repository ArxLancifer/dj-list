import React, { Fragment, useState } from 'react'
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table'; 
import { ITrack } from '../../interfaces/UserInterfaces';
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import ModalEmbedYoutube from './ModalEmbedYoutube';
import  {Play} from 'react-bootstrap-icons';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {setYoutubeLink} from '../store/modalState';
import { RootState } from '../store';
function TracksTable() {


    const dispatch = useDispatch();
    const youtubeLink = useSelector((state:RootState)=>state.modalState);
    console.log(youtubeLink);
    function handleSetLink(e:React.SyntheticEvent<HTMLElement>){
        console.log(e.currentTarget.dataset.trackTitle)
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
                    root:{
                        color:"#64d86b"
                    }
                },
            },
        }
    })

    const data:ITrack[] = [
        {
            play:"",
            _id:"123",
            title:"Fokume",
            artist:"Fokume",
            album:"Oti nanai",
            subGenre:"Gipsy rap",
            BPM:100,
            duration:"2min",
            youtubeLink:"https://www.youtube.com/watch?v=FRFeKXMBn3o"
        }
    ]

    const columns:MRT_ColumnDef<ITrack>[] = [
        {
            accessorKey: '_id', //access nested data with dot notation
            header: 'user ID',
            maxSize:100
        },
        {
            accessorKey: 'title', //access nested data with dot notation
            header: 'Title',
            maxSize:100,
        },
        {
            accessorKey: 'artist', //access nested data with dot notation
            header: 'Artist',
            maxSize:100
        },
        {
            accessorKey: 'album', //access nested data with dot notation
            header: 'Album',
            maxSize:100,
        },
        {
            accessorKey: 'BPM', //access nested data with dot notation
            header: 'BPM',
            maxSize:100
        },
        {
            accessorKey: 'duration', //access nested data with dot notation
            header: 'Duration',
            maxSize:100
        },
        // {
        //     accessorKey: 'youtubeLink', //access nested data with dot notation
        //     header: 'Link',
        //     maxSize:100
        // },
        {
            accessorKey: 'play',
            header: 'Play',
            maxSize:80,
            //you can access a row instance in column definition option callbacks like this
            muiTableBodyCellEditTextFieldProps: ({ row }) => ({
              disabled: row.original.title === 'Retired',
            }),
            //or in the component override callbacks like this
            Cell: ({ cell, row }) => (
                <button onClick={handleSetLink} className='btn btn-sm btn-danger p-0' data-link={row.original.youtubeLink} data-track-title={row.original.title}>
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
    <Fragment>
        <ModalEmbedYoutube />
    <Container>
    <ThemeProvider theme={theme}>
        <MaterialReactTable
            columns={columns} data={data}
            muiTableBodyCellProps={{sx:{fontSize:"0.85rem"}}}
            muiTableBodyRowProps={({ row }) => ({
                onClick: (event) => {
                    event.stopPropagation()
                    // console.info(event.target, row);
                },
                sx: {
                  cursor: 'pointer', //you might want to change the cursor too when adding an onClick
                },
              })}
            enableDensityToggle={false}
            initialState={{ density: 'compact' }}
        />
    </ThemeProvider>
    </Container>
    </Fragment>
  )
}

export default TracksTable
