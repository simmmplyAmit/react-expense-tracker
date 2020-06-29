import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import Transaction from "./Transaction";

function Transactions({ transactions, deleteTransaction }) {
    const classes = styles();

    const response =
        transactions.length <= 0 ? (
            <Typography variant="h6" style={{ textAlign: "center" }}>
                Add your first todo...
            </Typography>
        ) : (
            transactions.map((transaction) => (
                <Transaction
                    transaction={transaction}
                    key={transaction.id}
                    deleteTransaction={deleteTransaction}
                />
            ))
        );

    return (
        <div className={classes.transactions}>
            <Typography variant="h6">
                History
                <hr />
            </Typography>
            {response}
        </div>
    );
}

const styles = makeStyles({
    transaction: {
        margin: 10,
        // padding: 10,
        display: "flex",
        justifyContent: "space-between",
    },
    transactions: {
        marginTop: 20,
        marginBottom: 20,
        overflowY: "auto",
        maxHeight: 520,
    },
});

export default Transactions;
