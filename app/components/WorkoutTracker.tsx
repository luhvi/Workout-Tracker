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
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type {
  ExerciseType,
  ExercisesType,
  EditingType,
  EditedType,
} from "../types/WorkoutTracker";

import { useExercises } from "../ExercisesContext";
import { useEditing } from "../EditingContext";
import { useEdited } from "../EditedContext";

import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

type ExerciseListProps = ExercisesType & EditingType & EditedType;

const WorkoutTracker = () => {
  const { exercises, setExercises } = useExercises();
  const { editingExercise, setEditingExercise } = useEditing();
  const { editedExercise, setEditedExercise } = useEdited();

  useEffect(() => {
    const fetchExercises = async () => {
      const res = await fetch("/api/exercises");
      const data = await res.json();

      setExercises(data);
    };

    fetchExercises();
  }, [setExercises]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <ExerciseList
        exercises={exercises}
        setExercises={setExercises}
        editingExercise={editingExercise}
        setEditingExercise={setEditingExercise}
        editedExercise={editedExercise}
        setEditedExercise={setEditedExercise}
      />

      {editingExercise ? (
        <div className="bg-[rgb(10,10,10,0.7) fixed top-0 left-0 flex h-full w-full items-center justify-center backdrop-blur-sm">
          <EditExercise
            editingExercise={editingExercise}
            setEditingExercise={setEditingExercise}
            editedExercise={editedExercise}
            setEditedExercise={setEditedExercise}
            exercises={exercises}
            setExercises={setExercises}
          />
        </div>
      ) : null}
    </div>
  );
};

export default WorkoutTracker;

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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) return;

    setExercises((exercises) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      const newOrder = arrayMove(exercises, originalPos, newPos);

      saveNewOrder(newOrder);

      return newOrder;
    });
  };

  const saveNewOrder = async (newOrder: ExerciseType[]) => {
    const reorderedPayload = newOrder.map((exercise, index) => ({
      id: exercise.id,
      order: index,
    }));

    try {
      const res = await fetch("/api/exercises", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exercises: reorderedPayload }),
      });

      if (!res.ok) {
        throw new Error("Failed to save exercise order");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <SortableContext
          items={exercises}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex w-100 flex-col justify-center">
            {exercises.map((exercise) => (
              <Exercise
                key={exercise.id}
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
              />
            ))}
            <AddExercise exercises={exercises} setExercises={setExercises} />
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

type ExerciseProps = ExerciseType & ExercisesType & EditingType & EditedType;

const Exercise = ({
  id,
  name,
  kg,
  reps,
  sets,
  exercises,
  setExercises,
  setEditingExercise,
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

  const deleteExercise = async () => {
    const res = await fetch("/api/exercises", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setExercises((prev) => prev.filter((exercise) => exercise.id !== id));
    } else {
      console.error("Failed to delete exercise");
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
        className="absolute top-0 right-1.5 cursor-pointer text-sm text-neutral-600 transition-colors duration-300 hover:text-white"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={deleteExercise}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <button
        className="absolute right-0.5 bottom-0 cursor-pointer text-sm text-neutral-600 transition-colors duration-300 hover:text-white"
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

type EditExerciseProps = EditingType & EditedType & ExercisesType;

export const EditExercise = ({
  setEditingExercise,
  editedExercise,
  exercises,
  setExercises,
}: EditExerciseProps) => {
  const { register, handleSubmit } = useForm<ExerciseType>();

  const onSubmit: SubmitHandler<ExerciseType> = async (data: ExerciseType) => {
    if (!editedExercise) return;

    const { id, ...rest } = data;
    const body = { id: editedExercise.id, ...rest };

    const res = await fetch("/api/exercises", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const updatedExercise = await res.json();

      setExercises(
        exercises.map((exercise) =>
          exercise.id === updatedExercise.id ? updatedExercise : exercise,
        ),
      );
      setEditingExercise(false);
    } else {
      console.error("Failed to update exercise");
    }
  };

  return (
    <div className="rounded-sm border-2 border-neutral-800 bg-neutral-900 font-[family-name:var(--font-geist-mono)] shadow-[2px_2px_10px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between px-4 py-2 shadow-[2px_2px_10px_rgba(0,0,0,0.5)]">
        <h1 className="text-[0.75rem]">Edit Exercise</h1>
        <button
          className="cursor-pointer transition-colors duration-150 hover:text-neutral-600"
          onClick={() => setEditingExercise(false)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 flex flex-col">
          <label className="ml-4 text-[0.75rem]" htmlFor="name">
            Name
          </label>
          <input
            className="mx-4 h-10 rounded-md bg-neutral-800 pr-4 pl-3 text-sm text-white shadow-[2px_2px_10px_rgba(0,0,0,0.5)] outline-none"
            type="text"
            defaultValue={editedExercise?.name}
            {...register("name", { required: true })}
          ></input>
        </div>
        <div className="my-4 mr-4 flex items-center justify-between">
          <div className="flex flex-col">
            <label className="ml-4 text-[0.75rem]" htmlFor="kg">
              Kg
            </label>
            <input
              className="ml-4 h-10 w-24 rounded-md bg-neutral-800 pl-3 text-sm text-white shadow-[2px_2px_10px_rgba(0,0,0,0.5)] outline-none"
              type="number"
              defaultValue={editedExercise?.kg}
              {...register("kg", { required: true })}
            ></input>
          </div>
          <div className="flex flex-col">
            <label className="ml-4 text-[0.75rem]" htmlFor="reps">
              Reps
            </label>
            <input
              className="ml-4 h-10 w-24 rounded-md bg-neutral-800 pl-3 text-sm text-white shadow-[2px_2px_10px_rgba(0,0,0,0.5)] outline-none"
              type="number"
              defaultValue={editedExercise?.reps}
              {...register("reps", { required: true })}
            ></input>
          </div>
          <div className="flex flex-col">
            <label className="ml-4 text-[0.75rem]" htmlFor="sets">
              Sets
            </label>
            <input
              className="ml-4 h-10 w-24 rounded-md bg-neutral-800 pl-3 text-sm text-white shadow-[2px_2px_10px_rgba(0,0,0,0.5)] outline-none"
              type="number"
              defaultValue={editedExercise?.sets}
              {...register("sets", { required: true })}
            ></input>
          </div>
        </div>
        <div className="mb-6 flex flex-col">
          <label className="ml-4 text-[0.75rem]" htmlFor="misc">
            Misc
          </label>
          <input
            className="mx-4 h-10 rounded-md bg-neutral-800 px-4 text-sm text-white shadow-[2px_2px_10px_rgba(0,0,0,0.5)] outline-none"
            type="text"
            defaultValue={editedExercise?.misc}
            {...register("misc")}
          ></input>
        </div>
        <div className="flex items-center justify-between px-4 py-2 shadow-[2px_2px_10px_rgba(0,0,0,0.5)]">
          <button
            className="cursor-pointer text-[0.75rem] text-neutral-600 transition-colors duration-300 hover:text-white"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const AddExercise = ({ setExercises }: ExercisesType) => {
  const addExercise = async () => {
    const newExercise = {
      name: "New Exercise",
      kg: 0,
      reps: 0,
      sets: 0,
      misc: "",
    };

    const res = await fetch("/api/exercises", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExercise),
    });

    const savedExercise = await res.json();
    console.log("API response:", savedExercise);

    if (!res.ok) {
      console.error("Failed to add new exercise");
      return;
    }

    setExercises((prev) => [...prev, savedExercise]);
  };

  return (
    <div
      className="relative mb-2 flex h-10 cursor-pointer touch-none items-center justify-center rounded-sm border-2 border-neutral-800 bg-neutral-900 py-10 font-[family-name:var(--font-geist-mono)] transition-colors duration-150 hover:bg-neutral-800"
      onClick={addExercise}
    >
      <FontAwesomeIcon icon={faPlus} />
    </div>
  );
};
