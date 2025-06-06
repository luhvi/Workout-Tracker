export const HomePage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-center">
      <h1 className="mb-2 px-24 font-[family-name:var(--font-geist-mono)] text-3xl font-bold md:text-4xl">
        Workout Tracker
      </h1>
      <p className="md:text-md px-24 font-[family-name:var(--font-geist-mono)] text-sm">
        Welcome to my Workout Tracker. This app is designed for those who wish
        to take their fitness journey to the next level. It helps track your
        lifts alongside your bodyweight to make sure you&apos;re always
        progressing!
      </p>
    </div>
  );
};
