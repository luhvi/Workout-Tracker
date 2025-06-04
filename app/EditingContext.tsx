"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import { EditingType } from "./types/WorkoutTracker";

const EditingContext = createContext<EditingType | undefined>(undefined);

export const EditingProvider = ({ children }: { children: ReactNode }) => {
  const [editingExercise, setEditingExercise] = useState(false);

  return (
    <EditingContext.Provider value={{ editingExercise, setEditingExercise }}>
      {children}
    </EditingContext.Provider>
  );
};

export const useEditing = () => {
  const context = useContext(EditingContext);
  if (!context) {
    throw new Error("useEditing must be used within a EditingProvider");
  }
  return context;
};
