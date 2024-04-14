export interface CategoryI {
  id: string;
  name: string;
  icon: string;
}

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface Expense {
  id: string;
  expenseName: string;
  amount: number;
  category: CategoryI["id"];
  date: Value;
}

export interface DraftExpense extends Omit<Expense, "id"> {}
