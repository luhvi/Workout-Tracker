export type MealType = {
  id: string;
  name: string;
  calories: number;
  meal: "Breakfast" | "Lunch" | "Dinner";
};

export type ColumnType = {
  id: "Breakfast" | "Lunch" | "Dinner";
  title: "Breakfast" | "Lunch" | "Dinner";
};
