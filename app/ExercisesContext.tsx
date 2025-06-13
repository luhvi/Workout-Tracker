"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import { ExerciseType } from "./types/WorkoutTracker";
import { ExercisesType } from "./types/WorkoutTracker";

const ExercisesContext = createContext<ExercisesType | undefined>(undefined);

export const ExercisesProvider = ({ children }: { children: ReactNode }) => {
  const [exercises, setExercises] = useState<ExerciseType[]>([]);

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
