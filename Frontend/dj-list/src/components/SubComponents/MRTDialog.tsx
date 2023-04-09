import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'
import { Button, Stack } from 'react-bootstrap'

function TestDialog(columns:any) {
  return (
    <div>
      <Dialog open={true}>
      <DialogTitle textAlign="center">Create New Account</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
          >
            <TextField placeholder='asdasd'> </TextField>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button >Cancel</Button>
        <Button color="secondary" variant="contained">
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}

export default TestDialog
