import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useReducer } from "react";
import { BudgetCalcState, budgetReducer, Expense } from "../reducers/budget-reducer"
import { UnpaidExpenseList } from "../unpaid-expense-list";


test("Displays Expenses", async ()=>{

    const expenses: Expense[] = [
        {name: "Groceries", price: 100, essential: true, id:1},
        {name: "Books", price: 50, essential: false, id:2}
    ];
    
    const initialState: BudgetCalcState = {
        newExpenseName: "",
        newExpensePrice: 0,
        unpaidExpenses: [{id:101, name:"fwefaef", price:100, essential:true}],
        paidExpenses: [],
        totalExpenses: 0
    }
    function TestEnivronmentCompnent(){

        const [state,dispatch] = useReducer(budgetReducer,initialState)

        return <>
            <UnpaidExpenseList unpaidExpenses={state.unpaidExpenses} dispatch={dispatch}/>
        </>

    }

    screen.debug();

    render(<TestEnivronmentCompnent/>)
    const element = await screen.findByText(/Delete/);
    userEvent.click(element)

    screen.debug();
})