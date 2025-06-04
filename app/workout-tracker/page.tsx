"use client";

import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState, Dispatch, SetStateAction } from "react";
import { useDropdown } from "../DropdownContext";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { Navbar } from "../ui/Navbar";
import { DropdownNav } from "../ui/DropdownNav";

type Exercise = {
  id: number;
  name: string;
  kg: number;
  sets: number;
  reps: number;
  misc: string;
};

const WorkoutTracker = () => {
  const { showDropdown, setShowDropdown } = useDropdown();

  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: 1,
      name: "Dumbbell Press",
      kg: 56,
      sets: 2,
      reps: 6,
      misc: "Bench incline: 30°",
    },
    {
      id: 2,
      name: "Barbell Press",
      kg: 86,
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
    {
      id: 6,
      name: "Dumbbell Lateral Raise",
      kg: 16,
      sets: 2,
      reps: 6,
      misc: "",
    },
  ]);
  const [editingExercise, setEditingExercise] = useState<boolean>(false);
  const [editedExercise, setEditedExercise] = useState<Exercise>();

  return (
    <div>
      <Navbar />
      <DropdownNav />
      {!showDropdown ? (
        <ExerciseList
          exercises={exercises}
          setExercises={setExercises}
          editingExercise={editingExercise}
          setEditingExercise={setEditingExercise}
          editedExercise={editedExercise}
          setEditedExercise={setEditedExercise}
        />
      ) : null}
      {editingExercise ? (
        <EditExercise
          editingExercise={editingExercise}
          setEditingExercise={setEditingExercise}
          editedExercise={editedExercise}
          setEditedExercise={setEditedExercise}
        />
      ) : null}
    </div>
  );
};

export type ExercisesProps = {
  exercises: Exercise[];
  setExercises: Dispatch<SetStateAction<Exercise[]>>;
};

export type EditingProps = {
  editingExercise: boolean;
  setEditingExercise: Dispatch<SetStateAction<boolean>>;
};

export type EditedProps = {
  editedExercise: Exercise | undefined;
  setEditedExercise: Dispatch<SetStateAction<Exercise | undefined>>;
};

type ExerciseListProps = ExercisesProps & EditingProps & EditedProps;

export const ExerciseList = ({
  exercises,
  setExercises,
  editingExercise,
  setEditingExercise,
  editedExercise,
  setEditedExercise,
}: ExerciseListProps) => {
  const getTaskPos = (id: UniqueIdentifier): number => {
    return exercises.findIndex((exercise) => exercise.id === id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) return;

    if (active.id === over.id) return;

    setExercises((exercises) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(exercises, originalPos, newPos);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <div
      className={`mt-40 flex h-full w-[100vw] justify-center ${editingExercise ? "blur-xs" : ""}`}
    >
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <SortableContext
          items={exercises}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex h-200 w-100 flex-col">
            {exercises.map((exercise) => (
              <Exercise
                id={exercise.id}
                name={exercise.name}
                kg={exercise.kg}
                reps={exercise.reps}
                sets={exercise.sets}
                misc={exercise.misc}
                exercises={exercises}
                setExercises={setExercises}
                editingExercise={editingExercise}
                setEditingExercise={setEditingExercise}
                editedExercise={editedExercise}
                setEditedExercise={setEditedExercise}
                key={exercise.id}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

type ExerciseProps = Exercise & ExercisesProps & EditingProps & EditedProps;

const Exercise = ({
  id,
  name,
  kg,
  reps,
  sets,
  exercises,
  setExercises,
  editingExercise,
  setEditingExercise,
  editedExercise,
  setEditedExercise,
}: ExerciseProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const editExercise = () => {
    const exercise = exercises.find((exercise) => exercise.id === id);

    if (exercise) {
      setEditingExercise(true);
      setEditedExercise(exercise);
    }
  };

  return (
    <div
      className="relative mb-2 flex h-10 cursor-pointer touch-none items-center rounded-sm border-2 border-neutral-800 bg-neutral-900 py-10 font-[family-name:var(--font-geist-mono)]"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <button
        className="absolute top-0 right-1 cursor-pointer text-sm text-neutral-600 transition-colors duration-300 hover:text-white"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={editExercise}
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      <h1 className="absolute left-4 w-40 outline-none">{name}</h1>
      <div className="absolute right-32 mr-2 flex w-6 flex-col items-center justify-center text-center">
        <h1>Kg</h1>
        <h1>{kg}</h1>
      </div>
      <div className="absolute right-18 mr-2 flex w-6 flex-col items-center justify-center text-center">
        <h1>Reps</h1>
        <h1>{reps}</h1>
      </div>
      <div className="absolute right-4 mr-2 flex w-6 flex-col items-center justify-center text-center">
        <h1>Sets</h1>
        <h1>{sets}</h1>
      </div>
    </div>
  );
};

type EditExerciseProps = EditingProps & EditedProps;

export const EditExercise = ({
  editingExercise,
  setEditingExercise,
  editedExercise,
  setEditedExercise,
}: EditExerciseProps) => {
  return (
    <div className="absolute top-60 left-1/2 h-65 w-80 -translate-x-1/2 rounded-sm border-2 border-neutral-800 bg-neutral-900 font-[family-name:var(--font-geist-mono)] shadow-[2px_2px_10px_rgba(0,0,0,0.25)]">
      <div className="relative mt-1 mb-1">
        <label className="absolute top-0.5 left-1 text-[0.5rem]" htmlFor="name">
          Name
        </label>
        <input
          className="h-10 w-full px-1 text-sm text-white shadow-[2px_2px_10px_rgba(0,0,0,0.5)] outline-none"
          type="text"
          name="name"
          defaultValue={editedExercise?.name}
        ></input>
      </div>
      <div className="relative mt-1 mb-1">
        <label className="absolute top-0.5 left-1 text-[0.5rem]" htmlFor="kg">
          Kg
        </label>
        <input
          className="h-10 w-full px-1 text-sm text-white shadow-[2px_2px_10px_rgba(0,0,0,0.5)] outline-none"
          type="number"
          name="kg"
          defaultValue={editedExercise?.reps}
        ></input>
      </div>
      <div className="relative mt-1 mb-1">
        <label className="absolute top-0.5 left-1 text-[0.5rem]" htmlFor="reps">
          Reps
        </label>
        <input
          className="h-10 w-full px-1 text-sm text-white shadow-[2px_2px_10px_rgba(0,0,0,0.5)] outline-none"
          type="number"
          name="reps"
          defaultValue={editedExercise?.reps}
        ></input>
      </div>
      <div className="relative mt-1 mb-1">
        <label className="absolute top-0.5 left-1 text-[0.5rem]" htmlFor="sets">
          Sets
        </label>
        <input
          className="h-10 w-full px-1 text-sm text-white shadow-[2px_2px_10px_rgba(0,0,0,0.5)] outline-none"
          type="number"
          name="sets"
          defaultValue={editedExercise?.sets}
        ></input>
      </div>
      <div className="relative mt-1 mb-1">
        <label className="absolute top-0.5 left-1 text-[0.5rem]" htmlFor="misc">
          Misc
        </label>
        <input
          className="h-10 w-full px-1 text-sm text-white shadow-[2px_2px_10px_rgba(0,0,0,0.5)] outline-none"
          type="text"
          name="misc"
          defaultValue={editedExercise?.misc}
        ></input>
      </div>
      <button
        className="absolute right-3 bottom-1.5 cursor-pointer transition-colors duration-150 hover:text-neutral-600"
        onClick={() => setEditingExercise(false)}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export default WorkoutTracker;
