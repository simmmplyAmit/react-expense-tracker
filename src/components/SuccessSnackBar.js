import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

function SuccessSnackBar({ open, onClose }) {
    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        onClose();
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                Todo added!
            </Alert>
        </Snackbar>
    );
}

export default SuccessSnackBar;
