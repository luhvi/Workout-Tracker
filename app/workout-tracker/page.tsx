"use client";

import { Navbar } from "../ui/Navbar";
import { DropdownNav } from "../ui/DropdownNav";
import WorkoutTracker from "../components/WorkoutTracker";

const WorkoutTrackerPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <DropdownNav />
      </main>
      <WorkoutTracker />
    </div>
  );
};

export default WorkoutTrackerPage;
