import React from 'react'
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table'; 
import { ITrack } from '../../interfaces/UserInterfaces';
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { Container } from 'react-bootstrap';
import { red } from '@mui/material/colors';
function TracksTable() {

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
            _id:"123",
            title:"gia pame ligo",
            artist:"asdasd",
            album:"asdasd",
            subGenre:"asdasd",
            BPM:100,
            duration:"4min",
            youtubeLink:"asdasdas"
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
            maxSize:100
        },
        {
            accessorKey: 'artist', //access nested data with dot notation
            header: 'Artist',
            maxSize:100
        },
        {
            accessorKey: 'album', //access nested data with dot notation
            header: 'Album',
            maxSize:100
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
        {
            accessorKey: 'youtubeLink', //access nested data with dot notation
            header: 'Link',
            maxSize:100
        },
        {
            accessorKey: 'subGenre', //access nested data with dot notation
            header: 'Sub genre',
            maxSize:100,
        },
    ]
    
  return (
    <Container>
    <ThemeProvider theme={theme}>
        <MaterialReactTable
            columns={columns} data={data}
            muiTableBodyCellProps={{sx:{fontSize:"0.85rem"}}}
            muiTableBodyRowProps={(props:any)=>({onClick:props})}
            enableDensityToggle={false}
            initialState={{ density: 'compact' }}
        />
    </ThemeProvider>
    </Container>
  )
}

export default TracksTable
