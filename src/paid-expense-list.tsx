import { BudgetAction, Expense } from "./reducers/budget-reducer";

type PaidExpenseProps = {
    paidExpenses: Expense[],
    dispatch: React.Dispatch<BudgetAction>
}

export function PaidExpenseList(props: PaidExpenseProps) {
    return <ul>

        {props.paidExpenses.map(ex => <li>{ex.name} ${ex.price} {ex.essential ? <b>Essential</b> : <b>Non-Essential</b>} 
        <button onClick={() => props.dispatch({type:"DELETE_PAID_EXPENSE", payload: ex.id})}>Delete</button></li>)}

    </ul>
}