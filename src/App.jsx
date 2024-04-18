// react-router-dom imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts 
import Main, { mainLoader } from "./layouts/Main";

// routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";

import { logoutAction } from "./actions/logout";  // actions
import { deleteBudget } from "./actions/deleteBudget";
import { ToastContainer } from 'react-toastify';  // library imports
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        errorElement: <Error />,
        action: budgetAction,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          }
        ]
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
      <ToastContainer />
    </div>
  )
}

export default App
