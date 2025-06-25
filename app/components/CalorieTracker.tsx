import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

import { ColumnType, MealType } from "../types/CalorieTracker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

const CalorieTracker = () => {
  const [meals, setMeals] = useState<MealType[]>([
    { id: "1", name: "Smoothie", calories: 450, meal: "Breakfast" },
    { id: "2", name: "Burger", calories: 650, meal: "Lunch" },
    { id: "3", name: "Steak", calories: 550, meal: "Dinner" },
    { id: "4", name: "Smoothie", calories: 450, meal: "Breakfast" },
    { id: "5", name: "Burger", calories: 650, meal: "Lunch" },
    { id: "6", name: "Steak", calories: 550, meal: "Dinner" },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const mealId = active.id as string;
    const newMeal = over.id as MealType["meal"];

    setMeals(() =>
      meals.map((meal) =>
        meal.id === mealId ? { ...meal, meal: newMeal } : meal,
      ),
    );
  };

  const columns: ColumnType[] = [
    { id: "Breakfast", title: "Breakfast" },
    { id: "Lunch", title: "Lunch" },
    { id: "Dinner", title: "Dinner" },
  ];

  return (
    <div className="flex h-screen w-screen translate-y-40 justify-center">
      <div className="flex justify-between text-center">
        <DndContext onDragEnd={handleDragEnd}>
          {columns.map((column) => {
            return (
              <Column
                key={column.id}
                column={column}
                meals={meals.filter((meal) => meal.meal === column.id)}
                setMeals={setMeals}
              />
            );
          })}
        </DndContext>
      </div>
    </div>
  );
};

export default CalorieTracker;

type ColumnProps = {
  column: ColumnType;
  meals: MealType[];
  setMeals: Dispatch<SetStateAction<MealType[]>>;
};

const Column = ({ column, meals, setMeals }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  return (
    <div className={`${column.id !== "Dinner" ? "mr-2" : ""}`}>
      <h1 className="mb-2 w-40 cursor-pointer border-neutral-800 font-[family-name:var(--font-geist-mono)] text-xs font-medium transition-colors duration-150 hover:border-white md:w-60 md:text-lg">
        {column.title}
      </h1>
      <div ref={setNodeRef}>
        {meals.map((meal) => {
          return <Meal key={meal.id} meal={meal} />;
        })}
      </div>
      <AddMeal
        clickedBtn={column.id as "Breakfast" | "Lunch" | "Dinner"}
        setMeals={setMeals}
      />
    </div>
  );
};

type MealProps = {
  meal: MealType;
};

const Meal = ({ meal }: MealProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: meal.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="mb-2 flex h-12 w-40 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-neutral-800 bg-neutral-900 font-[family-name:var(--font-geist-mono)] text-[0.65rem] md:h-18 md:w-60 md:text-sm"
    >
      <h1>{meal.name}</h1>
      <h1>{meal.calories} kcal</h1>
    </div>
  );
};

type AddMealProps = {
  clickedBtn: "Breakfast" | "Lunch" | "Dinner";
  setMeals: Dispatch<SetStateAction<MealType[]>>;
};

const AddMeal = ({ clickedBtn, setMeals }: AddMealProps) => {
  const addMeal = () => {
    setMeals((prev) => [
      ...prev,
      { id: Date.now().toString(), name: "", calories: 0, meal: clickedBtn },
    ]);
  };

  return (
    <div
      onClick={addMeal}
      className="flex h-12 w-40 cursor-pointer items-center justify-center rounded-md border-2 border-neutral-800 bg-neutral-900 font-[family-name:var(--font-geist-mono)] text-xs transition-colors duration-150 hover:bg-neutral-800 md:h-18 md:w-60 md:text-sm"
    >
      <FontAwesomeIcon icon={faPlus} />
    </div>
  );
};
