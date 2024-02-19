import { useEffect, useRef } from "react"  // react imports
import { useFetcher } from "react-router-dom"  // rrd imports
import { PlusCircleIcon } from "@heroicons/react/24/solid"  // library imports

const AddExpenseForm = ( {budgets} ) => {
    const fetcher = useFetcher()
    const formRef = useRef()
    const focusRef = useRef()
    
    const isSubmitting = fetcher.state === "submitting"

    useEffect(() => {
        if(!isSubmitting) {
            // clear form
            formRef.current.reset()
            // reset focus
            focusRef.current.focus()
        }
    })
    return (
        <div className="form-wrapper">
            <h2 className="h3">Add New{" "}
                <span className="accent">
                     {budgets.length === 1 && `${budgets.map((budg) => budg.name)} `}
                </span>{" "}
                Expense
            </h2>
            <fetcher.Form method="post" className="grid-sm" ref={formRef} >
                <div className="expense-inputs">
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input type="text" name="newExpense" id="newExpense" placeholder="lunch, coffee, etc.." ref={focusRef} required />
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Amount</label>
                        <input type="number" step="1" inputMode="decimal" name="newExpenseAmount" id="newExpenseAmount" placeholder="700, 1000, etc.." required />
                    </div>
                </div>
                <div className="grid-xs" hidden={budgets.length === 1}>
                    <label htmlFor="newExpenseBudget">Budget Category</label>
                    <select name="newExpenseBudget" id="newExpenseBudget" required>
                        {
                            budgets
                            .sort((a,b) => a.createdAt - b.createdAt)
                            .map((budget) => {
                                return (
                                    <option key={budget.id} value={budget.id}>
                                        {budget.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <input type="hidden" name="_action" value="createExpense" />
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting ? <span>Submitting...</span> :
                        (
                            <>
                            <span>Add Expense</span>
                            <PlusCircleIcon width={20}/> 
                            </>
                        )
                    }   
                </button>
            </fetcher.Form>
        </div>
    )
}

export default AddExpenseForm