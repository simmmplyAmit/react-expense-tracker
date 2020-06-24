import React from "react";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import {
    SwipeableList,
    SwipeableListItem,
} from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";

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

function Transaction({ transaction, deleteTransaction }) {
    const classes = styles();

    return (
        <SwipeableList>
            <SwipeableListItem
                swipeRight={{
                    content: (
                        <div style={{ background: "#f00", color: "#fff" }}>
                            Delete Todo
                        </div>
                    ),
                    action: () => {
                        console.log(`Deleting transaction ${transaction}`);
                        deleteTransaction(transaction);
                    },
                }}
                // swipeLeft={{
                // content: <div>Revealed content during swipe</div>,
                // action: () => console.info('swipe action triggered')
                // }}
            >
                <Paper className={classes.transaction} key={transaction.id}>
                    <Typography variant="subtitle2">
                        {transaction.title}
                    </Typography>
                    <Typography variant="body1">
                        {transaction.amount}
                    </Typography>
                </Paper>
            </SwipeableListItem>
        </SwipeableList>
    );
}

export default Transaction;
