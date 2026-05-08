import { useQuery } from "@tanstack/react-query";
import {
  AddExpenseMutation,
  getExpenseCategories,
} from "../../services/expenseService";
import { useState } from "react";
import AddAndEditExpenseCard from "../../components/ui/AddAndEditExpenseCard";

const AddExpense = () => {
  const { data: expenseCategories, isLoading: isExpenseCategoriesLoading } =
    useQuery({
      queryKey: ["expenseCategories"],
      queryFn: getExpenseCategories,
    });
  console.log(expenseCategories);
  const [formData, setFormData] = useState({
    name: "",
    amount: 0,
    category: "",
    note: "",
    date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value = e.target.name === 'amount' ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  const addExpenseMutation = AddExpenseMutation();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addExpenseMutation.mutate({
      title: formData.name,
      amount: Number(formData.amount),
      category: formData.category? formData.category : "other",
      note: formData.note,
      date: formData.date,
    });
  };

  return (
    <div>
      <h1 className=" text-xl font-bold ">Add Expense</h1>
      <AddAndEditExpenseCard handleChange={handleChange} handleSubmit={handleSubmit} isExpenseCategoriesLoading={isExpenseCategoriesLoading} expenseCategories={expenseCategories} formData={formData} />
    </div>
  );
};

export default AddExpense;
