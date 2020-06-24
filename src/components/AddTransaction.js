import React, { Component } from "react";
import {
    TextField,
    Button,
    Grid,
    Typography,
    Snackbar,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SuccessSnackBar from "./SuccessSnackBar";

class AddTransactionDialog extends Component {
    state = {
        title: "",
        amount: undefined,
    };

    handleFormChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit(this.state);
        this.setState({
            title: "",
            amount: undefined,
        });
    };

    handleClose = () => {
        this.props.handleClose();
    };

    render() {
        const { open } = this.props;
        return (
            <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={this.handleClose}
            >
                <DialogTitle id="simple-dialog-title">
                    Add Transaction
                </DialogTitle>
                {/* <div style={{ marginTop: "40" }}>
                <Typography variant="h6">Add Transaction</Typography> */}
                <DialogContent>
                    <form onSubmit={this.handleFormSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="title"
                                    label="Expense"
                                    value={this.state.title}
                                    onChange={this.handleFormChange}
                                    required
                                    error={false}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="amount"
                                    label="Amount"
                                    value={this.state.amount}
                                    onChange={this.handleFormChange}
                                    required
                                    error={false}
                                    fullWidth
                                    type="number"
                                />
                            </Grid>
                            <Button
                                style={{ margin: "auto", marginBottom: 20 }}
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Save
                            </Button>
                        </Grid>
                    </form>
                </DialogContent>

                {/* </div> */}
            </Dialog>
        );
    }
}

export default class AddTransaction extends Component {
    state = {
        successOpen: false,
        dialogOpen: false,
    };

    handleSuccessSnackClose = () => {
        this.setState({
            successOpen: false,
        });
    };

    handleDialogOpen = () => {
        this.setState({
            dialogOpen: true,
        });
    };

    handleSubmit = (transaction) => {
        this.props.addTransaction(transaction);
        this.setState({
            dialogOpen: false,
            successOpen: true,
        });
    };

    handleClose = () => {
        this.setState({
            dialogOpen: false,
        });
    };

    render() {
        return (
            <div>
                <SuccessSnackBar
                    open={this.state.successOpen}
                    onClose={this.handleSuccessSnackClose}
                />
                <AddTransactionDialog
                    handleSubmit={this.handleSubmit}
                    handleClose={this.handleClose}
                    open={this.state.dialogOpen}
                />
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={this.handleDialogOpen}
                    style={{ position: "fixed", bottom: 20, right: 20 }}
                >
                    <AddIcon />
                </Fab>
            </div>
        );
    }
}
