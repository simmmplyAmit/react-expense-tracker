import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Balance from "./components/Balance";
import Summary from "./components/Summary";
import Transactions from "./components/Transactions";
import AddTransactionDialog from "./components/AddTransaction";

class App extends Component {
    state = {
        transactions: [
            { id: 1, title: "Todo 1", amount: 20 },
            { id: 2, title: "Todo 2", amount: -50 },
            { id: 3, title: "Todo 3", amount: 25 },
            { id: 4, title: "Todo 4", amount: -10 },
        ],
        nextId: 5,
    };

    addTransaction = (transaction) => {
        transaction.id = this.state.nextId;
        const updatedTransactions = [...this.state.transactions, transaction];
        this.setState({
            transactions: updatedTransactions,
            nextId: this.state.nextId + 1,
        });
    };

    deleteTransaction = (transaction) => {
        let transactions = [...this.state.transactions];
        transactions = transactions.filter((tr) => tr.id !== transaction.id);
        this.setState({
            transactions,
        });
    };

    render() {
        return (
            <>
                <Header />
                <Balance transactions={this.state.transactions} />
                <Summary transactions={this.state.transactions} />
                <Transactions
                    transactions={this.state.transactions}
                    deleteTransaction={this.deleteTransaction}
                />
                <AddTransactionDialog addTransaction={this.addTransaction} />
            </>
        );
    }
}

export default App;
