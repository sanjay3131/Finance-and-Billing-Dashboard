import { useQuery } from "@tanstack/react-query";
import AddAndEditExpenseCard from "../../components/ui/AddAndEditExpenseCard";
import {
  EditExpenseMutation,
  getExpenseCategories,
  getSingleExpense,
} from "../../services/expenseService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditExpense = () => {
  const param = useParams();
  const expenseId = param.expenseId!;
  console.log(expenseId);

  const { data: expenseData } = useQuery({
    queryKey: ["expense", expenseId],
    queryFn: () => getSingleExpense(expenseId),
  });
  console.log(expenseData);

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
    const value =
      e.target.name === "amount" ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  const editExpenseMutation = EditExpenseMutation();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("form data: ", formData);
    editExpenseMutation.mutate({
      id: expenseId,
      title: formData.name,
      amount: Number(formData.amount),
      category: formData.category ? formData.category : "other",
      note: formData.note,
      date: formData.date,
    });
  };

  useEffect(() => {
    if (expenseData) {
      const expense = expenseData.data;
      setFormData({
        name: expense.title,
        amount: expense.amount,
        category: expense.category,
        note: expense.notes,
        date: expense.expenseDate?.split("T")[0],
      });
    }
  }, [expenseData]);
  return (
    <div>
      <h1 className="text-xl font-semibold ml-4">Edit Expense</h1>
      <AddAndEditExpenseCard
        expenseCategories={expenseCategories}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
        isExpenseCategoriesLoading={isExpenseCategoriesLoading}
        isAddingExpense={false}
      />
    </div>
  );
};

export default EditExpense;
