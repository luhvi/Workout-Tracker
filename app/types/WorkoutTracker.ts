import { Dispatch, SetStateAction } from "react";

export type ExerciseType = {
  id: number;
  name: string;
  kg: number;
  sets: number;
  reps: number;
  misc: string;
};

export type ExercisesType = {
  exercises: ExerciseType[];
  setExercises: Dispatch<SetStateAction<ExerciseType[]>>;
};

export type EditingType = {
  editingExercise: boolean;
  setEditingExercise: Dispatch<SetStateAction<boolean>>;
};

export type EditedType = {
  editedExercise: ExerciseType | undefined;
  setEditedExercise: Dispatch<SetStateAction<ExerciseType | undefined>>;
};
