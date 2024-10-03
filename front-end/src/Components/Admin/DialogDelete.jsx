import React from "react";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export function DialogDelete({obj,open, onClose,action}){

      return (
        <>
         <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {obj} va etre supprimer , est ce que vous etes sur de le supprimer ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>REFUSER</Button>
          <Button onClick={action} autoFocus>
            ACCEPTER
          </Button>
        </DialogActions>
      </Dialog>
        </>
      )
}
