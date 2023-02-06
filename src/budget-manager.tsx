import { useReducer } from "react"
import { PaidExpenseList } from "./paid-expense-list";
import { BudgetCalcState, budgetReducer } from "./reducers/budget-reducer"
import { UnpaidExpenseList } from "./unpaid-expense-list";

const initialState: BudgetCalcState = {
    newExpenseName: "",
    newExpensePrice: 0,
    unpaidExpenses: [],
    paidExpenses: [],
    totalExpenses: 0
}

export function BudgetManager() {

    const [budgetState, dispatch] = useReducer(budgetReducer, initialState);

    return <>

        <h1>Budget Manager</h1>

        <label htmlFor="expenseName">Expense Name</label>
        <input id="expenseName" type="text" placeholder="groceries" onChange={event => dispatch({type:"SET_EXPENSE_NAME", payload: event.target.value})}/>

        <label htmlFor="expensePrice">Expense Price</label>
        <input id="expensePrice" type="number" placeholder="100" onChange={event => dispatch({type:"SET_EXPENSE_PRICE", payload: Number(event.target.value)})}/>

        <hr />

        <button onClick={()=>dispatch({type:"ADD_ESSENTIAL_EXPENSE"})}>Add Essential Expense</button>
        <button onClick={()=>dispatch({type:"ADD_NON_ESSENTIAL_EXPENSE"})}>Add Non-Essential Expense</button>

        <h3>Unpaid Expenses: </h3>
        
        <UnpaidExpenseList unpaidExpenses={budgetState.unpaidExpenses} dispatch={dispatch}/>

        <h3>Paid Expenses: </h3>
        
        <PaidExpenseList paidExpenses={budgetState.paidExpenses} dispatch={dispatch}/>

        <h4>Combined Costs of Expenses: ${budgetState.totalExpenses}</h4>
    
    </>


}