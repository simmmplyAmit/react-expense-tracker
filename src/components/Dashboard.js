import React, { Component } from "react";
import Balance from "./Balance";
import Summary from "./Summary";
import Transactions from "./Transactions";
import AddTransactionDialog from "./AddTransaction";
import provider from "../DataProvider";
import DeleteSnackBar from "./DeleteSnackBar";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
    state = {
        transactions: [],
        deleteSnack: false,
    };

    componentDidMount = async () => {
        let response = await provider.getList("expense");
        if (response.status !== 200) return this.props.history.push("/login");
        response = response.data.map((transaction) => {
            return {
                id: transaction.id,
                title: transaction.title,
                amount: transaction.amount,
                income: transaction.income,
                date: transaction.date,
            };
        });

        this.setState({
            transactions: response,
        });
    };

    addTransaction = async (transaction) => {
        let response = await provider.create("expense", { data: transaction });

        let transactions = [
            ...this.state.transactions,
            {
                id: response.data.id,
                title: response.data.title,
                amount: response.data.amount,
                income: response.data.income,
                date: response.data.date,
            },
        ];

        this.setState({
            transactions,
        });
    };

    deleteTransaction = (transaction) => {
        provider.delete("expense", { id: transaction.id });

        let transactions = [...this.state.transactions];
        transactions = transactions.filter((tr) => tr.id !== transaction.id);
        this.setState({
            transactions,
            deleteSnack: true,
        });
    };

    render() {
        return (
            <>
                <Balance transactions={this.state.transactions} />
                <Summary transactions={this.state.transactions} />
                <Transactions
                    transactions={this.state.transactions}
                    deleteTransaction={this.deleteTransaction}
                />
                <AddTransactionDialog addTransaction={this.addTransaction} />
                <DeleteSnackBar
                    open={this.state.deleteSnack}
                    onClose={this.handleDeleteSnackClose}
                />
            </>
        );
    }

    handleDeleteSnackClose() {
        this.setState({
            deleteSnack: false,
        });
    }
}

export default withRouter(Dashboard);
