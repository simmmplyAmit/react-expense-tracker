import React, { Component } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import dataProvider from "../DataProvider";
import { withRouter } from "react-router-dom";

export class Login extends Component {
    state = {
        emailAddress: undefined,
        password: undefined,
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="emailAddress"
                                label="Email"
                                onChange={this.handleFormChange}
                                required
                                error={false}
                                fullWidth
                                type="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="password"
                                label="Password"
                                onChange={this.handleFormChange}
                                required
                                error={false}
                                fullWidth
                                type="password"
                            />
                        </Grid>
                        <Button
                            style={{ margin: "auto", marginBottom: 20 }}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Login
                        </Button>
                    </Grid>
                </form>
            </div>
        );
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    handleFormSubmit = async (e) => {
        e.preventDefault();

        await dataProvider.login(this.state);
        this.setState({
            email: undefined,
            password: undefined,
        });
        this.props.history.push("/");
    };
}

export default withRouter(Login);
