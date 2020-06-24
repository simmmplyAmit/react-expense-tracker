import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import Transaction from "./Transaction";

const styles = makeStyles({
    transaction: {
        margin: 10,
        padding: 10,
        display: "flex",
        justifyContent: "space-between",
    },
    transactions: {
        marginTop: 20,
    },
});

function Transactions({ transactions, deleteTransaction }) {
    const classes = styles();
    return (
        <div
            className={classes.transactions}
            style={{ overflowY: "auto", maxHeight: 520 }}
        >
            <Typography variant="h6">
                History
                <hr />
            </Typography>
            {transactions.map((transaction) => (
                <Transaction
                    transaction={transaction}
                    key={transaction.id}
                    deleteTransaction={deleteTransaction}
                />
            ))}
        </div>
    );
}

export default Transactions;
