import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
    balance: {
        marginTop: 20,
    },
});

function Balance({ transactions }) {
    const classes = styles();
    let total = transactions.reduce(function (total, transaction) {
        return total + +transaction.amount;
    }, 0);
    return (
        <div className={classes.balance}>
            <Typography variant="h6">YOUR BALANCE</Typography>
            <Typography variant="h4">₹{total}</Typography>
        </div>
    );
}

export default Balance;
