import { use, useState } from "react";
import { Dispatch, SetStateAction } from "react";

import { ColumnType, MealType } from "../types/CalorieTracker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { SubmitHandler, useForm } from "react-hook-form";

const CalorieTracker = () => {
  const [meals, setMeals] = useState<MealType[]>([
    { id: "1", name: "Smoothie", calories: 450, meal: "Breakfast" },
    { id: "2", name: "Burger", calories: 650, meal: "Lunch" },
    { id: "3", name: "Steak", calories: 550, meal: "Dinner" },
    { id: "4", name: "Smoothie", calories: 450, meal: "Breakfast" },
    { id: "5", name: "Burger", calories: 650, meal: "Lunch" },
    { id: "6", name: "Steak", calories: 550, meal: "Dinner" },
  ]);
  const [editingMeal, setEditingMeal] = useState<boolean>(false);
  const [editedMeal, setEditedMeal] = useState<MealType | null>(null);

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
    <div className="relative mt-40 flex w-screen justify-center">
      <div className="flex justify-between text-center">
        <DndContext onDragEnd={handleDragEnd}>
          {columns.map((column) => {
            return (
              <Column
                key={column.id}
                column={column}
                meals={meals.filter((meal) => meal.meal === column.id)}
                setMeals={setMeals}
                setEditingMeal={setEditingMeal}
                editedMeal={editedMeal}
                setEditedMeal={setEditedMeal}
              />
            );
          })}
        </DndContext>
      </div>
      {editingMeal ? (
        <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center backdrop-blur-sm">
          <EditMeal
            editingMeal={editingMeal}
            setEditingMeal={setEditingMeal}
            editedMeal={editedMeal}
            setEditedMeal={setEditedMeal}
            meals={meals}
            setMeals={setMeals}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CalorieTracker;

type ColumnProps = {
  column: ColumnType;
  meals: MealType[];
  setMeals: Dispatch<SetStateAction<MealType[]>>;
  setEditingMeal: Dispatch<SetStateAction<boolean>>;
  editedMeal: MealType | null;
  setEditedMeal: Dispatch<SetStateAction<MealType | null>>;
};

const Column = ({
  column,
  meals,
  setMeals,
  setEditingMeal,
  setEditedMeal,
}: ColumnProps) => {
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
          return (
            <Meal
              key={meal.id}
              meal={meal}
              setMeals={setMeals}
              setEditingMeal={setEditingMeal}
              setEditedMeal={setEditedMeal}
            />
          );
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
  setMeals: Dispatch<SetStateAction<MealType[]>>;
  setEditingMeal: Dispatch<SetStateAction<boolean>>;
  setEditedMeal: Dispatch<SetStateAction<MealType | null>>;
};

const Meal = ({ meal, setMeals, setEditingMeal, setEditedMeal }: MealProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: meal.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  const id = meal.id;

  const deleteMeal = () => {
    setMeals((meals) => meals.filter((meal) => meal.id !== id));
  };

  const editMeal = () => {
    setEditingMeal(true);
    setEditedMeal(meal);
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="relative mb-2 flex h-12 w-40 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-neutral-800 bg-neutral-900 font-[family-name:var(--font-geist-mono)] text-[0.65rem] md:h-18 md:w-60 md:text-sm"
    >
      <button
        onPointerDown={(event) => event.stopPropagation()}
        onClick={deleteMeal}
        className="absolute top-0 right-1 cursor-pointer text-neutral-600 transition-colors duration-150 hover:text-white"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <h1>{meal.name}</h1>
      <h1>{meal.calories} kcal</h1>
      <button
        onPointerDown={(event) => event.stopPropagation()}
        onClick={editMeal}
        className="absolute right-0.5 bottom-0 cursor-pointer text-neutral-600 transition-colors duration-150 hover:text-white"
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
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
      {
        id: Date.now().toString(),
        name: "New Meal",
        calories: 0,
        meal: clickedBtn,
      },
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

type EditMealProps = {
  editingMeal: boolean;
  setEditingMeal: Dispatch<SetStateAction<boolean>>;
  editedMeal: MealType | null;
  setEditedMeal: Dispatch<SetStateAction<MealType | null>>;
  meals: MealType[];
  setMeals: Dispatch<SetStateAction<MealType[]>>;
};

const EditMeal = ({
  setEditingMeal,
  editedMeal,
  meals,
  setMeals,
}: EditMealProps) => {
  const { register, handleSubmit } = useForm<Omit<MealType, "id" | "meal">>();

  const onSubmit: SubmitHandler<Omit<MealType, "id" | "meal">> = async (
    data: Omit<MealType, "id" | "meal">,
  ) => {
    if (!editedMeal) return;

    const { name, calories } = data;

    const foundMeal = meals.find((meal) => meal.id === editedMeal.id);
    if (!foundMeal) return;

    const currentMeal = { ...foundMeal };

    const updatedMeal: MealType = {
      ...currentMeal,
      name,
      calories,
    };

    setMeals(
      meals.map((meal) => (meal.id === editedMeal.id ? updatedMeal : meal)),
    );

    setEditingMeal(false);
  };

  return (
    <div className="relative h-50 w-85 rounded-sm border-2 border-neutral-800 bg-neutral-900 font-[family-name:var(--font-geist-mono)] shadow-[2px_2px_10px_rgba(0,0,0,0.25)]">
      <div className="relative mb-2 flex h-8 w-full items-center justify-center shadow-[2px_2px_10px_rgba(0,0,0,0.5)]">
        <h1 className="absolute left-2 font-[family-name:var(--font-geist-mono)] text-xs">
          Edit Meal
        </h1>
        <button
          onClick={() => setEditingMeal(false)}
          className="absolute right-2 cursor-pointer text-sm text-neutral-600 transition-colors duration-150 hover:text-white"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-2">
          <div className="flex flex-col">
            <label className="text-xs" htmlFor="name">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              className="text-md mb-2 h-8 w-full rounded-sm bg-neutral-800 px-2 shadow-[2px_2px_10px_rgba(0,0,0,0.5)] outline-none"
              type="text"
              defaultValue={editedMeal ? editedMeal.name : ""}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs" htmlFor="calories">
              Calories
            </label>
            <input
              {...register("calories", { required: true })}
              className="text-md h-8 w-full rounded-sm bg-neutral-800 px-2 shadow-[2px_2px_10px_rgba(0,0,0,0.5)] outline-none"
              type="number"
              defaultValue={editedMeal ? editedMeal.calories : ""}
            />
          </div>
        </div>
        <div className="absolute bottom-0 flex h-8 w-full items-center justify-start shadow-[2px_2px_10px_rgba(0,0,0,0.5)]">
          <button className="ml-2 cursor-pointer font-[family-name:var(--font-geist-mono)] text-xs text-neutral-600 transition-colors duration-150 hover:text-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
