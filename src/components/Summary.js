import React from "react";
import { Paper, Grid, makeStyles, Typography } from "@material-ui/core";

const styles = makeStyles({
    summary: {
        padding: 20,
        textAlign: "center",
    },
    leftSummary: {
        borderRight: "2px solid grey",
    },
    paper: {
        marginTop: 20,
    },
});

function Summary({ transactions }) {
    const classes = styles();

    let income = 0,
        expense = 0;

    transactions.forEach((transaction) => {
        transaction.income
            ? (income += +transaction.amount)
            : (expense += Math.abs(transaction.amount));
    });

    return (
        <>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid
                        item
                        xs
                        className={`${classes.summary} ${classes.leftSummary}`}
                    >
                        <Typography variant="body1">Income</Typography>
                        <Typography variant="h6" color="primary">
                            ₹{income}
                        </Typography>
                    </Grid>
                    <Grid item xs className={classes.summary}>
                        <Typography variant="body1">Expenses</Typography>
                        <Typography variant="h6" color="error">
                            ₹{expense}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default Summary;
