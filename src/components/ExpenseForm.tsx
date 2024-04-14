import { FormEvent, useEffect, useState } from "react";
import { useBudget, useForm } from "../hooks";
import DatePicker from "react-date-picker";
import { ErrorMessage } from "./";
import { categories } from "../data/categories";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

export const ExpenseForm = () => {
  const {
    amount,
    category,
    date,
    expenseName,
    expense,
    setExpense,
    handleChange,
    handleChangeDate,
  } = useForm({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });

  const [error, setError] = useState("");
  const [previousAmount, setPreviousAmount] = useState(0);
  const { dispatch, state, remainingBudget } = useBudget();

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter(
        (currentExpense) => currentExpense.id === state.editingId
      )[0];

      setExpense(editingExpense);
      setPreviousAmount(editingExpense.amount);
    }
  }, [state.editingId]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // validar
    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // Validar que no me pase del limite
    if (expense.amount - previousAmount > remainingBudget) {
      setError("Ese gasto se sale del presupuesto");
      return;
    }

    // Agregar o actualizar el gasto
    if (state.editingId) {
      dispatch({
        type: "update-expense",
        payload: { expense: { id: state.editingId, ...expense } },
      });
    } else {
      dispatch({
        type: "add-newExpense",
        payload: { expense },
      });
    }

    //reiniciar el state
    setPreviousAmount(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        {state.editingId ? "Guardar Cambios" : "Nuevo Gasto"}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          name="expenseName"
          id="expenseName"
          value={expenseName}
          onChange={handleChange}
          placeholder="Añade el nombre del gasto"
          className="bg-slate-100 p-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={amount}
          onChange={handleChange}
          placeholder="Añade la cantidad del gasto ej. 300"
          className="bg-slate-100 p-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoría:
        </label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={handleChange}
          className="bg-slate-100 p-2"
        >
          <option value="">-- Seleccione una opción --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-xl">
          Fecha Gasto:
        </label>
        <DatePicker
          value={date}
          className="bg-slate-100 p-2 border-0"
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        value={state.editingId ? "Guardar Cambios" : "Registrar Gasto"}
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
      />
    </form>
  );
};
