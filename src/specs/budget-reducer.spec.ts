import exp from "constants";
import { BudgetCalcState, budgetReducer } from "../reducers/budget-reducer"

test("SET_EXPENSE_NAME", ()=>{
    const budgetCalcState: BudgetCalcState = {
        newExpenseName: "",
        newExpensePrice: 0,
        unpaidExpenses: [],
        paidExpenses: [],
        totalExpenses: 0
    }

    const nextState = budgetReducer(budgetCalcState, {type: "SET_EXPENSE_NAME", payload: "Groceries"});
    expect(nextState.newExpenseName).toBe("Groceries");
})

test("SET_EXPENSE_PRICE", ()=>{
    const budgetCalcState: BudgetCalcState = {
        newExpenseName: "Groceries",
        newExpensePrice: 0,
        unpaidExpenses: [],
        paidExpenses: [],
        totalExpenses: 0
    }

    const nextState = budgetReducer(budgetCalcState, {type: "SET_EXPENSE_PRICE", payload: 100});
    expect(nextState.newExpensePrice).toBe(100);
})

test("ADD_ESSENTIAL_EXPENSE", ()=>{
    const budgetCalcState: BudgetCalcState = {
        newExpenseName: "Groceries",
        newExpensePrice: 100,
        unpaidExpenses: [],
        paidExpenses: [],
        totalExpenses: 0
    }

    const nextState = budgetReducer(budgetCalcState, {type: "ADD_ESSENTIAL_EXPENSE"});
    expect(nextState.unpaidExpenses.length).toBe(1);
    expect(nextState.unpaidExpenses[0].essential).toBe(true);
    expect(nextState.totalExpenses).toBe(100);
})

test("ADD_NON_ESSENTIAL_EXPENSE", ()=>{
    const budgetCalcState: BudgetCalcState = {
        newExpenseName: "Movie",
        newExpensePrice: 20,
        unpaidExpenses: [{name: "Groceries", price: 100, essential: true, id: 101}],
        paidExpenses: [],
        totalExpenses: 100
    }

    const nextState = budgetReducer(budgetCalcState, {type: "ADD_NON_ESSENTIAL_EXPENSE"});
    expect(nextState.unpaidExpenses.length).toBe(2);
    expect(nextState.unpaidExpenses[1].essential).toBe(false);
    expect(nextState.totalExpenses).toBe(120);
})

test("PAY_EXPENSE", ()=>{
    const budgetCalcState: BudgetCalcState = {
        newExpenseName: "Movie",
        newExpensePrice: 20,
        unpaidExpenses: [{name: "Groceries", price: 100, essential: true, id: 101}],
        paidExpenses: [],
        totalExpenses: 100
    }

    const nextState = budgetReducer(budgetCalcState, {type: "PAY_EXPENSE", payload: 101});
    expect(nextState.unpaidExpenses.length).toBe(0);
    expect(nextState.paidExpenses.length).toBe(1);
})

test("DELETE_PAID_EXPENSE", ()=>{
    const budgetCalcState: BudgetCalcState = {
        newExpenseName: "Movie",
        newExpensePrice: 20,
        unpaidExpenses: [],
        paidExpenses: [{name: "Groceries", price: 100, essential: true, id: 101}],
        totalExpenses: 100
    }

    const nextState = budgetReducer(budgetCalcState, {type: "DELETE_PAID_EXPENSE", payload: 101});
    expect(nextState.paidExpenses.length).toBe(0);
    expect(nextState.totalExpenses).toBe(0);
})

test("DELETE_UNPAID_EXPENSE", ()=>{
    const budgetCalcState: BudgetCalcState = {
        newExpenseName: "Movie",
        newExpensePrice: 20,
        unpaidExpenses: [{name: "Groceries", price: 100, essential: true, id: 101}],
        paidExpenses: [],
        totalExpenses: 100
    }

    const nextState = budgetReducer(budgetCalcState, {type: "DELETE_UNPAID_EXPENSE", payload: 101});
    expect(nextState.unpaidExpenses.length).toBe(0);
    expect(nextState.totalExpenses).toBe(0);
})