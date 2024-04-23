import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import styles from './ConfirmDialog.module.css'


function ConfirmDialog({ confirmDialog, setConfirmDialog }) {

  function noButton() {
    console.log('No button clicked');
    setConfirmDialog({ ...confirmDialog, isOpen: false });
  }

  function yesButton() {
    console.log('Yes button clicked');
    confirmDialog.onConfirm(); // Call the `onConfirm` function from the component where the dialog is opened
  }

  return (
    <Dialog open={confirmDialog.isOpen} className={styles['container']}>
      <DialogContent className={styles['DialogContent']}>
        <DialogTitle className={styles['DialogTitle']} variant="h4" fontSize='22px'>
          {confirmDialog.title}
        </DialogTitle>
        <Typography variant="subtitle1" fontWeight="bold" className={styles['Typography']} >
          {confirmDialog.subtitle}
        </Typography>
        <DialogActions className={styles['DialogActions']}>
          <button className={styles['no-button']} onClick={noButton}>No</button>
          <button className={styles['yes-button']} onClick={yesButton}>Yes</button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDialog
