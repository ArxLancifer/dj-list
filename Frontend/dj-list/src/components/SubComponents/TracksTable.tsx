import React, { Fragment, useEffect, useState} from 'react'
import MaterialReactTable, { MRT_ColumnDef,  MaterialReactTableProps } from 'material-react-table'; 
import { INewTrack, ITrack } from '../../interfaces/UserInterfaces';
import { createTheme, ThemeProvider} from '@mui/material';
import ModalEmbedYoutube from './ModalEmbedYoutube';
import  {Play} from 'react-bootstrap-icons';
import { Alert, Button, Container, Row } from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import {setYoutubeLink , modalShow} from '../store/modalState';
import {useParams} from 'react-router-dom';
import useTrackTable from '../../hooks/useTrackTable';
import {useNavigate} from 'react-router-dom';
import MRTDialog from './MRTDialog';
import { table } from 'console';


function TracksTable() {

    const [tracks, setTracks] = useState<ITrack[]>([]);
    const [error, setError] = useState<string>('');
    const {listid} = useParams();
    const {fetchTracks, editTrack} = useTrackTable();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!tracks.length){
            //@ts-ignore
            fetchTracks(listid).then(data=> setTracks(data.tracks));
        }
    }, [tracks])
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
    // Changes row data and updated request to database to change data as well
    const handleSaveRow: MaterialReactTableProps<ITrack>['onEditingRowSave'] =
    async ({ exitEditingMode, row, values }) => {
        const request = await editTrack(listid ?? "", row.id, values);
       // @ts-ignore
        if(request.errorMessage){
            //@ts-ignore
            setError(request.errorMessage);
            exitEditingMode();
            return;
        }
       tracks[row.index]  = {...values, _id:row.id};
        setTracks([...tracks]);
        
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
        {
            accessorKey: 'youtubeLink', //access nested data with dot notation
            header: 'Link',
            maxSize:100,
        Cell: ({ cell, row }) => (
            <button onClick={(e)=>{handleSetLink(e); dispatch(modalShow())}} className='btn btn-sm btn-danger p-0' data-link={row.original.youtubeLink} data-track-title={row.original.title}>
            Play
            <Play className='fs-5'/>
            </button>
        ),
        },
        // {
        //     accessorKey: 'play',
        //     header: 'Play',
        //     maxSize:80,
        //     muiTableBodyCellEditTextFieldProps: {
        //         disabled:true,
        //         hidden:true
        //       },
        //     //or in the component override callbacks like this
        //     Cell: ({ cell, row }) => (
        //         <button onClick={(e)=>{handleSetLink(e); dispatch(modalShow())}} className='btn btn-sm btn-danger p-0' data-link={row.original.youtubeLink} data-track-title={row.original.title}>
        //         {row.original.play = 'Play'}
        //         <Play className='fs-5'/>
        //         </button>
        //     ),
        //   },
        {
            accessorKey: 'subGenre', //access nested data with dot notation
            header: 'Sub genre',
            maxSize:100,
        },
    ]
    
  return (
    
    <Container className='mt-5 pt-5'>
        {error && <Alert className='w-50 mx-auto' variant='danger'>{error}</Alert>}
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
       {/* <MRTDialog  columns={columns}/>  MRT Custom dialog if needed ill add this later instead of my AddTrackForm*/}
       {/*docs source https://www.material-react-table.com/docs/examples/editing-crud */}
    </ThemeProvider>
    </Container>
  )
}

export default TracksTable
