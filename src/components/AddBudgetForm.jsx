import { useEffect, useRef } from "react";  // react imports
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";  // library imports
import { Form, useFetcher } from "react-router-dom";  // rrd imports

const AddBudgetForm = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting"

    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if(isSubmitting){
            formRef.current.reset()
            focusRef.current.focus()
        }
    }, [isSubmitting])

    return (
        <div className="form-wrapper">
            <h2 className="h3">
                create budget
            </h2>
            <fetcher.Form method="post" className="grid-sm" ref={formRef}>
                <div className="grid-xs">
                    <label htmlFor="newBudget">Budget Name</label>
                    <input type="text" name="newBudget" id="newBudget" placeholder="groceries, bills, etc.." required ref={focusRef}/>
                </div>
                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount</label>
                    <input type="number" step="1" name="newBudgetAmount" id="newBudgetAmount" placeholder="120₹, 2000₹, etc.." required inputMode="decimal"/>
                </div>
                <input type="hidden" name="_action" value="createBudget" />
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting ? <span>Submitting...</span> :
                        (
                            <>
                            <span>Create Budget</span>
                            <CurrencyRupeeIcon width={20}/> 
                            </>
                        )
                    }   
                </button>  
            </fetcher.Form>
        </div>
    )
}

export default AddBudgetForm;