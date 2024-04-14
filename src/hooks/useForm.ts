import { ChangeEvent, useState } from "react";
import { Value } from "../interfaces/interfaces";

export const useForm = <T>(initialForm: T) => {
  const [expense, setExpense] = useState(initialForm);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const isAmountField = ["amount"].includes(name);

    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  return {
    ...expense,
    //* Properties
    expense,
    //* Methods
    setExpense,
    handleChange,
    handleChangeDate,
  };
};
