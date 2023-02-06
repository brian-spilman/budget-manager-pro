export type Expense = {
    name: string,
    price: number,
    essential: boolean,
    id: number
}

export type BudgetCalcState = {
    newExpenseName: string,
    newExpensePrice: number,
    unpaidExpenses: Expense[],
    paidExpenses: Expense[],
    totalExpenses: number
}

export type AddEssentialExpenseAction = {type: "ADD_ESSENTIAL_EXPENSE"};
export type AddNonEssentialExpenseAction = {type: "ADD_NON_ESSENTIAL_EXPENSE"};
export type SetExpenseNameAction = {type: "SET_EXPENSE_NAME", payload: string};
export type SetExpensePriceAction = {type: "SET_EXPENSE_PRICE", payload: number};
export type PayExpenseAction = {type: "PAY_EXPENSE", payload: number};
export type DeletePaidExpenseAction = {type: "DELETE_PAID_EXPENSE", payload: number};
export type DeleteUnpaidExpenseAction = {type: "DELETE_UNPAID_EXPENSE", payload: number};
export type BudgetAction = AddEssentialExpenseAction | AddNonEssentialExpenseAction | SetExpenseNameAction | SetExpensePriceAction | PayExpenseAction | DeletePaidExpenseAction | DeleteUnpaidExpenseAction;

export function budgetReducer(state: BudgetCalcState, action: BudgetAction): BudgetCalcState {
    let newState: BudgetCalcState = JSON.parse(JSON.stringify(state));

    switch(action.type){
        case "SET_EXPENSE_NAME": {
            newState.newExpenseName = action.payload;
            return newState;
        }
        case "SET_EXPENSE_PRICE": {
            newState.newExpensePrice = action.payload;
            return newState;
        }
        case "ADD_ESSENTIAL_EXPENSE": {
            let expense: Expense = {
                name: newState.newExpenseName,
                price: newState.newExpensePrice,
                essential: true,
                id: Math.random()
            };
            newState.unpaidExpenses.push(expense);
            newState.totalExpenses += expense.price;
            return newState;
        }
        case "ADD_NON_ESSENTIAL_EXPENSE": {
            let expense: Expense = {
                name: newState.newExpenseName,
                price: newState.newExpensePrice,
                essential: false,
                id: Math.random()
            };
            newState.unpaidExpenses.push(expense);
            newState.totalExpenses += expense.price;
            return newState;
        }
        case "PAY_EXPENSE": {
            const expense: Expense | undefined = newState.unpaidExpenses.find(ex => ex.id === action.payload);
            if(!expense){ // quick undefined check
                return newState;
            }
            newState.unpaidExpenses = newState.unpaidExpenses.filter(ex => ex.id !== action.payload);

            newState.paidExpenses.push(expense);
            return newState
        }
        case "DELETE_PAID_EXPENSE": {
            const expense: Expense | undefined = newState.paidExpenses.find(ex => ex.id === action.payload);
            if(!expense){ // quick undefined check
                return newState;
            }
            newState.paidExpenses = newState.paidExpenses.filter(ex => ex.id !== action.payload);
            newState.totalExpenses -= expense.price;
            return newState;
        }
        case "DELETE_UNPAID_EXPENSE": {
            const expense: Expense | undefined = newState.unpaidExpenses.find(ex => ex.id === action.payload);
            if(!expense){ // quick undefined check
                return newState;
            }
            newState.unpaidExpenses = newState.unpaidExpenses.filter(ex => ex.id !== action.payload);
            newState.totalExpenses -= expense.price;
            return newState;
        }
    }
}

