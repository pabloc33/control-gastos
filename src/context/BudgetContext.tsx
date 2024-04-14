import { Dispatch, ReactNode, createContext, useMemo, useReducer } from "react";
import {
  BudgetState,
  budgetActions,
  budgetReducer,
  initialState,
} from "../reducers/budget-reducer";

interface BudgetContextProps {
  state: BudgetState;
  dispatch: Dispatch<budgetActions>;
  totalExpenses: number;
  remainingBudget: number;
}

interface BudgetProviderProps {
  //children: JSX.Element | JSX.Element[];
  children: ReactNode;
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = useMemo(
    () => state.expenses.reduce((total, expense) => expense.amount + total, 0),
    [state.expenses]
  );

  const remainingBudget = state.budget - totalExpenses;

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalExpenses,
        remainingBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
