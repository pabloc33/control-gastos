import { formatCurrency } from "../helpers";

interface Props {
  label?: string;
  amount: number;
}

export const AmountDisplay = ({ label, amount }: Props) => {
  return (
    <p className="text-2xl text-blue-600 font-bold">
      {label && `${label}: `}
      <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  );
};
