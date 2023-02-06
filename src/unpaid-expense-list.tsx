import { BudgetAction, Expense } from "./reducers/budget-reducer";

type UnpaidExpenseProps = {
    unpaidExpenses: Expense[],
    dispatch: React.Dispatch<BudgetAction>
}

export function UnpaidExpenseList(props: UnpaidExpenseProps) {
    return <ul>

        {props.unpaidExpenses.map(ex => <li>{ex.name} ${ex.price} {ex.essential ? <b>Essential</b> : <b>Non-Essential</b>} 
        <button onClick={() => props.dispatch({type: "PAY_EXPENSE", payload: ex.id})}>Click to Pay</button>
        <button onClick={() => props.dispatch({type:"DELETE_UNPAID_EXPENSE", payload: ex.id})}>Delete</button></li>)}

    </ul>
}