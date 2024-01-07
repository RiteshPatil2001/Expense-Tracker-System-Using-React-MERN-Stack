import React from "react";
import { Progress } from 'antd';

const Analytics = ({ allTransaction }) =>{
    //category
    const categories = ["Salary", "Fee", "Project", "Food", "Movie", "Bills", "Medical", "Tax", "Other", "Picnic", "Shares Buy", "Shares Sell", "Cashback"];

    //total transaction
    const totalTransaction = allTransaction.length;
    const totalIncomeTransactions = allTransaction.filter( 
        (transaction) => transaction.type === "Income"
    );
    const totalExpenseTransactions = allTransaction. filter(
        (transaction) => transaction.type === "Expense"
    );
    const totalIncomePercent = (totalIncomeTransactions.length / totalTransaction) * 100;
    const totalExpensePercent = (totalExpenseTransactions.length / totalTransaction) * 100;

    //total turnover
    const totalTurnover = allTransaction.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
    );
    const totalIncomeTurnover = allTransaction
        .filter((transaction) => transaction.type === "Income")
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpenseTurnover = allTransaction
        .filter((transaction) => transaction.type === "Expense")
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnoverPercent = (totalIncomeTurnover/totalTurnover)*100;
    const totalExpenseTurnoverPercent = (totalExpenseTurnover/totalTurnover)*100;

    return(
        <>
            <div className="row m-1 mt-4 mb-5 analytics-table">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header">
                            Total Tranction : {totalTransaction}
                        </div>
                        <div className="card-body">
                            <h5 className="text-success">Income : {totalIncomeTransactions.length}</h5>
                            <h5 className="text-danger">Expense : {totalExpenseTransactions.length}</h5>
                        </div>
                        <div>
                            <Progress type="circle" strokeColor={'green'} className="mx-2" percent={totalIncomePercent.toFixed(0)} />
                            <Progress type="circle" strokeColor={'red'} className="mx-2" percent={totalExpensePercent.toFixed(0)} />
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header">
                            Total Turnover : {totalTurnover}
                        </div>
                        <div className="card-body">
                            <h5 className="text-success">Income : {totalIncomeTurnover}</h5>
                            <h5 className="text-danger">Expense : {totalExpenseTurnover}</h5>
                        </div>
                        <div>
                            <Progress type="circle" strokeColor={'green'} className="mx-2" percent={totalIncomeTurnoverPercent.toFixed(0)} />
                            <Progress type="circle" strokeColor={'red'} className="mx-2" percent={totalExpenseTurnoverPercent.toFixed(0)} />
                        </div>
                    </div>
                </div>
    
                <div className="col-md-3">
                    <h4>Categorywise Income</h4>
                    {categories.map((category) => {
                        const amount = allTransaction
                        .filter(
                            (transaction) =>
                                transaction.type === "Income" &&
                                transaction.category === category
                        )
                        .reduce((acc, transaction) => acc + transaction.amount, 0);
                        return(
                            amount > 0 &&(
                                <div className="card">
                                    <div className="card-body">
                                        <h5>{category}</h5>
                                        <Progress percent={((amount/totalIncomeTurnover)*100).toFixed(0)} />
                                    </div>
                                </div>
                            )
                        )
                    })}
                </div>
                <div className="col-md-3">
                    <h4>Categorywise Expense</h4>
                    {categories.map((category) => {
                        const amount = allTransaction
                        .filter(
                            (transaction) =>
                                transaction.type === "Expense" &&
                                transaction.category === category
                        )
                        .reduce((acc, transaction) => acc + transaction.amount, 0);
                        return(
                            amount > 0 &&(
                                <div className="card">
                                    <div className="card-body">
                                        <h5>{category}</h5>
                                        <Progress percent={((amount/totalExpenseTurnover)*100).toFixed(0)} />
                                    </div>
                                </div>
                            )
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Analytics