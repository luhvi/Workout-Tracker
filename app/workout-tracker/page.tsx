"use client";

import { Navbar } from "../ui/Navbar";
import { DropdownNav } from "../ui/DropdownNav";
import WorkoutTracker from "../components/WorkoutTracker";

const WorkoutTrackerPage = () => {
  return (
    <div>
      <Navbar />
      <DropdownNav />
      <WorkoutTracker />
    </div>
  );
};

export default WorkoutTrackerPage;
