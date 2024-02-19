import { redirect } from "react-router-dom";  // rrd imports
import { deleteItem } from "../helpers";  // helpers
import { toast } from "react-toastify";  // library

export async function logoutAction() {
    // delete the user
    deleteItem({
        key: "userName"
    })
    deleteItem({
        key: "budgets"
    })
    deleteItem({
        key: "expenses"
    })
    toast.success("You've deleted your account successfully.")
    // return redirect
    return redirect("/")
}