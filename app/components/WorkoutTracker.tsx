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
import { useDropdown } from "../DropdownContext";

type ExerciseListProps = ExercisesType & EditingType & EditedType;

const WorkoutTracker = () => {
  const { exercises, setExercises } = useExercises();
  const { editingExercise, setEditingExercise } = useEditing();
  const { editedExercise, setEditedExercise } = useEdited();
  const { showDropdown } = useDropdown();

  return (
    <div>
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
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <div
      className={`flex h-screen w-full items-center justify-center overflow-hidden pt-20 ${editingExercise ? "blur-xs" : ""}`}
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
          <div className="flex h-200 w-100 flex-col justify-center">
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

type ExerciseProps = ExerciseType & ExercisesType & EditingType & EditedType;

const Exercise = ({
  id,
  name,
  kg,
  reps,
  sets,
  exercises,
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

type EditExerciseProps = EditingType & EditedType;

export const EditExercise = ({
  setEditingExercise,
  editedExercise,
}: EditExerciseProps) => {
  return (
    <div className="absolute top-1/3 left-1/2 h-81 w-90 -translate-x-1/2 rounded-sm border-2 border-neutral-800 bg-neutral-900 font-[family-name:var(--font-geist-mono)] shadow-[2px_2px_10px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between px-4 py-2 shadow-[2px_2px_10px_rgba(0,0,0,0.5)]">
        <h1 className="text-sm font-medium">Edit Exercise</h1>
        <button
          className="cursor-pointer transition-colors duration-150 hover:text-neutral-600"
          onClick={() => setEditingExercise(false)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="mt-4 flex flex-col">
        <label className="ml-4 text-[0.75rem]" htmlFor="name">
          Name
        </label>
        <input
          className="mx-4 h-10 rounded-md bg-neutral-800 pr-4 pl-3 text-sm text-white shadow-[2px_2px_10px_rgba(0,0,0,0.5)] outline-none"
          type="text"
          name="name"
          defaultValue={editedExercise?.name}
        ></input>
      </div>
      <div className="my-4 mr-4 flex items-center justify-between">
        <div className="flex flex-col">
          <label className="ml-4 text-[0.75rem]" htmlFor="kg">
            Kg
          </label>
          <input
            className="ml-4 h-10 w-20 rounded-md bg-neutral-800 pl-3 text-sm text-white shadow-[2px_2px_10px_rgba(0,0,0,0.5)] outline-none"
            type="number"
            name="kg"
            defaultValue={editedExercise?.kg}
          ></input>
        </div>
        <div className="flex flex-col">
          <label className="ml-4 text-[0.75rem]" htmlFor="reps">
            Reps
          </label>
          <input
            className="ml-4 h-10 w-20 rounded-md bg-neutral-800 pl-3 text-sm text-white shadow-[2px_2px_10px_rgba(0,0,0,0.5)] outline-none"
            type="number"
            name="reps"
            defaultValue={editedExercise?.reps}
          ></input>
        </div>
        <div className="flex flex-col">
          <label className="ml-4 text-[0.75rem]" htmlFor="sets">
            Sets
          </label>
          <input
            className="ml-4 h-10 w-20 rounded-md bg-neutral-800 pl-3 text-sm text-white shadow-[2px_2px_10px_rgba(0,0,0,0.5)] outline-none"
            type="number"
            name="sets"
            defaultValue={editedExercise?.sets}
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
          name="misc"
          defaultValue={editedExercise?.misc}
        ></input>
      </div>
      <div className="flex items-center justify-between px-4 py-2 shadow-[2px_2px_10px_rgba(0,0,0,0.5)]">
        <button className="cursor-pointer text-sm font-medium text-neutral-600 transition-colors duration-300 hover:text-white">
          Save
        </button>
      </div>
    </div>
  );
};
