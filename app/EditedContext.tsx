"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import { ExerciseType } from "./types/WorkoutTracker";
import { EditedType } from "./types/WorkoutTracker";

const EditedContext = createContext<EditedType | undefined>(undefined);

export const EditedProvider = ({ children }: { children: ReactNode }) => {
  const [editedExercise, setEditedExercise] = useState<
    ExerciseType | undefined
  >(undefined);

  return (
    <EditedContext.Provider value={{ editedExercise, setEditedExercise }}>
      {children}
    </EditedContext.Provider>
  );
};

export const useEdited = () => {
  const context = useContext(EditedContext);
  if (!context) {
    throw new Error("useEdited must be used within a EditedProvider");
  }
  return context;
};
