import { Link, useLoaderData } from "react-router-dom";  // react-router-dom imports
import { createBudget, createExpense, deleteItem, fetchData, wait } from "../helpers";  // helper functions
import Intro from "../components/Intro";  // intro component
import { toast } from "react-toastify";  // library imports
import AddBudgetForm from "../components/AddBudgetForm";  // budget component
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// loader function
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return { budgets, userName, expenses }
}

export async function dashboardAction ({request}) {
    await wait();

    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);
    
    // newUser submission
    if(_action === "newUser") {
         try {
            localStorage.setItem("userName", JSON.stringify(values.userName));
            return toast.success(`Welcome ${values.userName}`)
        } catch(e) {
            throw new Error("There was a problem creating your account.")
        }
    } 

    if(_action === "createBudget") {
        try {
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount,
            })
            return toast.success("budget Created");
        } catch(e) {
            throw new Error("There was a problem creating your budget.")
        }
    }

    if(_action === "createExpense") {
        try {
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget
            })
            return toast.success(`Expense ${values.newExpense} created!`)
        } catch(e) {
            throw new Error("There was a problem creating your expense.")
        }
    }

    if(_action === "deleteExpense") {
        try {
            deleteItem({
                key: "expenses",
                id: values.expenseId
            })
            return toast.success("Expense deleted!");
        } catch(e) {
            throw new Error("There was a problem deleting your expense.")
        }
    }
}

const Dashboard = () => {
    const { budgets, userName, expenses } = useLoaderData()

    return (
        <>
            <div>
                {userName ? (
                    <div className="dashboard">
                        <h1>Welcome, <span className="accent">{userName}</span></h1>
                        <div className="grid-sm">
                            {
                                budgets && budgets.length > 0 ?
                                (
                                    <div className="grid-lg">
                                        <div className="flex-lg">
                                            <AddBudgetForm />
                                            <AddExpenseForm budgets={budgets} />
                                        </div>
                                        <h2>Existing Budgets</h2>
                                        <div className="budgets">
                                            {
                                                budgets.map((budget) => (
                                                    <BudgetItem key={budget.id} budget={budget} />
                                                ))
                                            }
                                        </div>
                                        {
                                            expenses && expenses.length > 0 && (
                                                <div className="grid-nd">
                                                    <h2>Recent Expenses</h2>
                                                    <Table expenses={expenses.sort((a,b) => 
                                                        b.createdAt - a.createdAt)
                                                        .slice(0, 8)
                                                    } />
                                                    {expenses.length > 8 && (
                                                        <Link to="expenses" className="btn btn--dark">
                                                            view all expenses
                                                        </Link>
                                                    )} 
                                                </div>
                                            )
                                        }
                                    </div>
                                ) : (
                                    <div className="grid-sm">
                                        <p>Personal budgeting is the secret to financial freedom.</p>
                                        <p>Create a budget to get started.</p>
                                        <AddBudgetForm />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ) : <Intro />}
            </div>
        </>
    )
};

export default Dashboard;
