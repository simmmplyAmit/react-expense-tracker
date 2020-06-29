import "date-fns";
import React, { Component } from "react";
import {
    TextField,
    Button,
    Grid,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    Checkbox,
    FormGroup,
    FormControlLabel,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SuccessSnackBar from "./SuccessSnackBar";
// import DateFnsUtils from "@date-io/date-fns";
import MomentUtils from "@date-io/moment";
import {
    MuiPickersUtilsProvider,
    // KeyboardDatePicker,
    DatePicker,
} from "material-ui-pickers";

class AddTransactionDialog extends Component {
    state = {
        title: "",
        amount: undefined,
        income: false,
        date: undefined,
    };

    handleDateChange = (date) => {
        this.setState({
            date,
        });
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
        this.setState({
            title: "",
            amount: undefined,
        });
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
                <DialogContent>
                    <form onSubmit={this.handleFormSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="title"
                                    label="Expense"
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
                                    onChange={this.handleFormChange}
                                    required
                                    error={false}
                                    fullWidth
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                inputProps={{
                                                    "aria-label":
                                                        "secondary checkbox",
                                                }}
                                                onChange={(e) =>
                                                    this.setState({
                                                        income:
                                                            e.target.checked,
                                                    })
                                                }
                                            />
                                        }
                                        label="Income"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={6}>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <DatePicker
                                        keyboard
                                        placeholder="DD/MM/YYYY"
                                        format={"DD/MM/YYYY"}
                                        // handle clearing outside => pass plain array if you are not controlling value outside
                                        // mask={(value) =>
                                        //     value
                                        //         ? [
                                        //               /\d/,
                                        //               /\d/,
                                        //               "/",
                                        //               /\d/,
                                        //               /\d/,
                                        //               "/",
                                        //               /\d/,
                                        //               /\d/,
                                        //               /\d/,
                                        //               /\d/,
                                        //           ]
                                        //         : []
                                        // }
                                        value={this.state.date}
                                        onChange={this.handleDateChange}
                                        // disableOpenOnEnter
                                        animateYearScrolling={false}
                                        autoOk={true}
                                        clearable
                                        // onInputChange={(e) =>
                                        //     console.log(
                                        //         "Keyboard:",
                                        //         e.target.value
                                        //     )
                                        // }
                                    />

                                    {/* <p>
                                        {this.state.selectedDate === null
                                            ? "Its null"
                                            : "Not Null"}
                                    </p>
                                    <p>
                                        {JSON.stringify(
                                            this.state.selectedDate
                                        )}
                                    </p> */}
                                </MuiPickersUtilsProvider>
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
