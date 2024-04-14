import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useBudget } from "../hooks";

export const BudgetForm = () => {
  const [budget, setBudget] = useState(0);
  const { dispatch } = useBudget();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBudget(event.target.valueAsNumber);
  };

  const isValid = useMemo(() => {
    return isNaN(budget);
  }, [budget]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch({
      type: "add-budget",
      payload: { budget },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir Presupuesto
        </label>
        <input
          type="number"
          name="budget"
          id="budget"
          value={budget}
          onChange={handleChange}
          className="w-full bg-white border-gray-200 p-2"
          placeholder="Define tu presupuesto"
        />
      </div>

      <input
        type="submit"
        value="Definir Presupuesto"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-10"
        disabled={isValid}
      />
    </form>
  );
};
