"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import { ExerciseType } from "./types/WorkoutTracker";
import { ExercisesType } from "./types/WorkoutTracker";

const ExercisesContext = createContext<ExercisesType | undefined>(undefined);

export const ExercisesProvider = ({ children }: { children: ReactNode }) => {
  const [exercises, setExercises] = useState<ExerciseType[]>([
    {
      id: 0,
      name: "Dumbbell Press",
      kg: 56,
      sets: 2,
      reps: 6,
      misc: "Bench incline: 30°",
    },
    {
      id: 1,
      name: "Barbell Press",
      kg: 86,
      sets: 2,
      reps: 6,
      misc: "",
    },
    {
      id: 2,
      name: "Dumbbell Lateral Raise",
      kg: 16,
      sets: 2,
      reps: 6,
      misc: "",
    },
    {
      id: 3,
      name: "Dumbbell Lateral Raise",
      kg: 16,
      sets: 2,
      reps: 6,
      misc: "",
    },
    {
      id: 4,
      name: "Dumbbell Lateral Raise",
      kg: 16,
      sets: 2,
      reps: 6,
      misc: "",
    },
    {
      id: 5,
      name: "Dumbbell Lateral Raise",
      kg: 16,
      sets: 2,
      reps: 6,
      misc: "",
    },
  ]);

  return (
    <ExercisesContext.Provider value={{ exercises, setExercises }}>
      {children}
    </ExercisesContext.Provider>
  );
};

export const useExercises = () => {
  const context = useContext(ExercisesContext);
  if (!context) {
    throw new Error("useExercises must be used within a ExercisesProvider");
  }
  return context;
};
