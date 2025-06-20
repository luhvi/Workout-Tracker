import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

import {
  WeightType,
  WeightsType,
  ShownWeekStartType,
  ShownWeekType,
  ShownMonthType,
  ShownQuarterType,
  ShownYearType,
  ShownAllType,
  SelectedInfoType,
} from "../types/WeightTracker";
import { SubmitHandler, useForm } from "react-hook-form";

const getWeekRangeString = (date: Date): string => {
  const day = date.getDay();
  const diffToMonday = (day + 6) % 7;

  const start = new Date(date);
  start.setDate(date.getDate() - diffToMonday);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const format = (d: Date) =>
    `${d.toLocaleString("en-US", { month: "long" })} ${d.getDate()}`;

  return `${format(start)} - ${format(end)}`;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const quarters = [
  "January - March",
  "April - June",
  "July - September",
  "October - December",
] as const;

const WeightTracker = () => {
  const [weights, setWeights] = useState<WeightType[]>([]);

  const [selectedInfo, setSelectedInfo] = useState<
    "Week" | "Month" | "Quarter" | "Year" | "All"
  >("Month");

  const [shownWeekStart, setShownWeekStart] = useState<Date>(() => {
    const now = new Date();
    const day = now.getDay();
    const diffToMonday = (day + 6) % 7;
    const monday = new Date(now);
    monday.setDate(now.getDate() - diffToMonday);
    return monday;
  });
  const [shownWeek, setShownWeek] = useState<string>(() =>
    getWeekRangeString(shownWeekStart),
  );

  const currentMonthIndex = new Date().getMonth();
  const [shownMonth, setShownMonth] = useState<(typeof months)[number]>(
    months[currentMonthIndex],
  );

  const currentQuarter = () => {
    if (currentMonthIndex >= 3) {
      return "January - March";
    } else if (currentMonthIndex >= 6) {
      return "April - June";
    } else if (currentMonthIndex >= 9) {
      return "July - September";
    } else {
      return "October - December";
    }
  };
  const [shownQuarter, setShownQuarter] = useState<
    | "January - March"
    | "April - June"
    | "July - September"
    | "October - December"
  >(currentQuarter());

  const currentYear = new Date().getFullYear();
  const [shownYear, setShownYear] = useState<number>(currentYear);

  const currentAll = () => {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];

    for (let i = 5; i >= 0; i--) {
      years.push(currentYear - i);
    }

    return `${years[0]} - ${years[5]}`;
  };

  const [shownAll, setShownAll] = useState<string>(currentAll());

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <WeightForm weights={weights} setWeights={setWeights} />
      <InfoSelection
        selectedInfo={selectedInfo}
        setSelectedInfo={setSelectedInfo}
      />
      <WeightDiagram
        selectedInfo={selectedInfo}
        setSelectedInfo={setSelectedInfo}
        shownWeekStart={shownWeekStart}
        setShownWeekStart={setShownWeekStart}
        shownWeek={shownWeek}
        setShownWeek={setShownWeek}
        shownMonth={shownMonth}
        setShownMonth={setShownMonth}
        shownQuarter={shownQuarter}
        setShownQuarter={setShownQuarter}
        shownYear={shownYear}
        setShownYear={setShownYear}
        shownAll={shownAll}
        setShownAll={setShownAll}
      />
    </div>
  );
};

export default WeightTracker;

const InfoSelection = ({ selectedInfo, setSelectedInfo }: SelectedInfoType) => {
  return (
    <div className="mb-2 flex w-100 items-center justify-between rounded-full border-2 border-neutral-800 bg-neutral-900 px-4 py-2 text-center font-[family-name:var(--font-geist-mono)] text-xs">
      <button
        className={`cursor-pointer rounded-full px-4 py-1 transition-colors duration-150 ${selectedInfo === "Week" ? "bg-neutral-800" : "hover:text-neutral-600"}`}
        onClick={() => setSelectedInfo("Week")}
      >
        Week
      </button>
      <button
        className={`cursor-pointer rounded-full px-4 py-1 transition-colors duration-150 ${selectedInfo === "Month" ? "bg-neutral-800" : "hover:text-neutral-600"}`}
        onClick={() => setSelectedInfo("Month")}
      >
        Month
      </button>
      <button
        className={`cursor-pointer rounded-full px-4 py-1 transition-colors duration-150 ${selectedInfo === "Quarter" ? "bg-neutral-800" : "hover:text-neutral-600"}`}
        onClick={() => setSelectedInfo("Quarter")}
      >
        Quarter
      </button>
      <button
        className={`cursor-pointer rounded-full px-4 py-1 transition-colors duration-150 ${selectedInfo === "Year" ? "bg-neutral-800" : "hover:text-neutral-600"}`}
        onClick={() => setSelectedInfo("Year")}
      >
        Year
      </button>
      <button
        className={`cursor-pointer rounded-full px-4 py-1 transition-colors duration-150 ${selectedInfo === "All" ? "bg-neutral-800" : "hover:text-neutral-600"}`}
        onClick={() => setSelectedInfo("All")}
      >
        All
      </button>
    </div>
  );
};

type WeightDiagramProps = SelectedInfoType &
  ShownWeekStartType &
  ShownWeekType &
  ShownMonthType &
  ShownQuarterType &
  ShownYearType &
  ShownAllType;

const WeightDiagram = ({
  selectedInfo,
  setShownWeekStart,
  shownWeekStart,
  shownWeek,
  setShownWeek,
  shownMonth,
  setShownMonth,
  shownQuarter,
  setShownQuarter,
  shownYear,
  setShownYear,
  shownAll,
}: WeightDiagramProps) => {
  const updateWeek = (next: boolean) => {
    const date = new Date(shownWeekStart);
    date.setDate(shownWeekStart.getDate() + (next ? 7 : -7));
    setShownWeekStart(date);
    setShownWeek(getWeekRangeString(date));
  };

  const updateMonth = (next: boolean) => {
    const currentIndex = months.indexOf(shownMonth);
    let nextIndex = currentIndex + (next ? 1 : -1);

    if (nextIndex < 0) nextIndex = months.length - 1;
    if (nextIndex >= months.length) nextIndex = 0;
    setShownMonth(months[nextIndex]);
  };

  const updateQuarter = (next: boolean) => {
    const currentIndex = quarters.indexOf(shownQuarter);
    let nextIndex = currentIndex + (next ? 1 : -1);

    if (nextIndex < 0) nextIndex = quarters.length - 1;
    if (nextIndex >= quarters.length) nextIndex = 0;
    setShownQuarter(quarters[nextIndex]);
  };

  const updateYear = (next: boolean) => {
    const increment = next ? 1 : -1;
    setShownYear((prev) => prev + increment);
  };

  const getNext = (next: boolean) => {
    if (selectedInfo === "Week") {
      return updateWeek(next);
    } else if (selectedInfo === "Month") {
      return updateMonth(next);
    } else if (selectedInfo === "Quarter") {
      return updateQuarter(next);
    } else if (selectedInfo === "Year") {
      return updateYear(next);
    }
  };

  const getHeader = () => {
    if (selectedInfo === "Week") {
      return shownWeek;
    } else if (selectedInfo === "Month") {
      return shownMonth;
    } else if (selectedInfo === "Quarter") {
      return shownQuarter;
    } else if (selectedInfo === "Year") {
      return shownYear;
    } else {
      return shownAll;
    }
  };

  const getWeekDays = (): number[] => {
    const days: number[] = [];
    const start = new Date(shownWeekStart);

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      days.push(date.getDate());
    }

    return days;
  };

  const monthsData: { [month: string]: number } = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };

  const getMonthDays = () => {
    return monthsData[shownMonth];
  };

  const getQuarterDays = (): number[] => {
    const quarterMonths: {
      [key: string]: { monthName: string; days: number }[];
    } = {
      "January - March": [
        { monthName: "January", days: 31 },
        { monthName: "February", days: 28 },
        { monthName: "March", days: 31 },
      ],
      "April - June": [
        { monthName: "April", days: 30 },
        { monthName: "May", days: 31 },
        { monthName: "June", days: 30 },
      ],
      "July - September": [
        { monthName: "July", days: 31 },
        { monthName: "August", days: 31 },
        { monthName: "September", days: 30 },
      ],
      "October - December": [
        { monthName: "October", days: 31 },
        { monthName: "November", days: 30 },
        { monthName: "December", days: 31 },
      ],
    };

    const months = quarterMonths[shownQuarter];
    if (!months) return [];

    const days: number[] = [];

    months.forEach(({ days: daysInMonth }) => {
      for (let day = 6; day <= daysInMonth; day += 6) {
        days.push(day);
      }
    });

    return days;
  };

  const monthAbbreviations = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "June",
    "July",
    "Aug",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  const getAllYears = () => {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];

    for (let i = 5; i >= 0; i--) {
      years.push(currentYear - i);
    }

    return years;
  };

  return (
    <div className="relative h-90 w-100 rounded-sm border-2 border-neutral-800 bg-neutral-900 font-[family-name:var(--font-geist-mono)]">
      <div
        className={`flex h-16.5 items-center border-b-2 border-neutral-800 bg-neutral-900 p-4 text-center font-[family-name:var(--font-geist-mono)] ${selectedInfo === "All" ? "justify-center" : "justify-between"}`}
      >
        {selectedInfo !== "All" ? (
          <button
            className="h-8 w-8 cursor-pointer items-center rounded-full bg-neutral-800 text-sm shadow-[2px_2px_10px_rgba(0,0,0,0.25)] transition-colors duration-150 hover:text-neutral-600"
            onClick={() => getNext(false)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        ) : null}
        <h1>{getHeader()}</h1>
        {selectedInfo !== "All" ? (
          <button
            className="h-8 w-8 cursor-pointer items-center rounded-full bg-neutral-800 text-sm shadow-[2px_2px_10px_rgba(0,0,0,0.25)] transition-colors duration-150 hover:text-neutral-600"
            onClick={() => getNext(true)}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        ) : null}
      </div>
      <div className="absolute bottom-[29.19px] left-[42.41px] h-[262px] w-[354px]">
        <div className="flex h-[43.666px] w-full flex-row justify-between border-b-2 border-neutral-800">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="h-[43.666px] w-14.75 border-r-2 border-neutral-800"
            ></div>
          ))}
          <div className="h-[43.666px] w-14.75"></div>
        </div>
        <div className="flex h-[43.666px] w-full flex-row justify-between border-b-2 border-neutral-800">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="h-[43.666px] w-14.75 border-r-2 border-neutral-800"
            ></div>
          ))}
          <div className="h-[43.666px] w-14.75"></div>
        </div>
        <div className="flex h-[43.666px] w-full flex-row justify-between border-b-2 border-neutral-800">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="h-[43.666px] w-14.75 border-r-2 border-neutral-800"
            ></div>
          ))}
          <div className="h-[43.666px] w-14.75"></div>
        </div>
        <div className="flex h-[43.666px] w-full flex-row justify-between border-b-2 border-neutral-800">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="h-[43.666px] w-14.75 border-r-2 border-neutral-800"
            ></div>
          ))}
          <div className="h-[43.666px] w-14.75"></div>
        </div>
        <div className="flex h-[43.666px] w-full flex-row justify-between border-b-2 border-neutral-800">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="h-[43.666px] w-14.75 border-r-2 border-neutral-800"
            ></div>
          ))}
          <div className="h-[43.666px] w-14.75"></div>
        </div>
        <div className="flex h-[43.666px] w-full flex-row justify-between">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="h-[43.666px] w-14.75 border-r-2 border-neutral-800"
            ></div>
          ))}
          <div className="h-[43.666px] w-14.75"></div>
        </div>
      </div>
      <div className="absolute flex h-[267px] flex-col items-center justify-between px-2 py-4 text-[0.55rem]">
        <span>100kg</span>
        <span>95kg</span>
        <span>90kg</span>
        <span>85kg</span>
        <span>80kg</span>
        <span>75kg</span>
        <span>70kg</span>
        <span>65kg</span>
        <span>60kg</span>
        <span>55kg</span>
        <span>50kg</span>
      </div>
      {selectedInfo === "Week" ? (
        <div className="absolute bottom-0 ml-[29.2px] flex w-[370.8px] items-center justify-between px-4 py-2 text-[0.55rem]">
          {getWeekDays().map((day, index) => (
            <span key={index}>{day}</span>
          ))}
        </div>
      ) : null}
      {selectedInfo === "Month" ? (
        <div className="absolute bottom-0 ml-[29.2px] flex w-[370.8px] items-center justify-between px-4 py-2 text-[0.55rem]">
          {Array.from({ length: getMonthDays() }, (_, i) =>
            (i + 1) % 3 === 0 ? <span key={i}>{i + 1}</span> : null,
          )}
        </div>
      ) : null}
      {selectedInfo === "Quarter" ? (
        <div className="absolute bottom-0 ml-[29.2px] flex w-[370.8px] items-center justify-between px-4 py-2 text-[0.55rem]">
          {getQuarterDays().map((day, index) => (
            <span key={index}>{day}</span>
          ))}
        </div>
      ) : null}
      {selectedInfo === "Year" ? (
        <div className="absolute bottom-0 ml-[29.2px] flex w-[370.8px] items-center justify-between px-4 py-2 text-[0.55rem]">
          {monthAbbreviations.map((month, index) => (
            <span key={index}>{month}</span>
          ))}
        </div>
      ) : null}
      {selectedInfo === "All" ? (
        <div className="absolute bottom-0 ml-[29.2px] flex w-[370.8px] items-center justify-between px-4 py-2 text-[0.55rem]">
          {getAllYears().map((year, index) => (
            <span key={index}>{year}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const WeightForm = ({ weights, setWeights }: WeightsType) => {
  const { register, handleSubmit, reset } = useForm<WeightType>();

  const onSubmit: SubmitHandler<WeightType> = (data) => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    const newEntry: WeightType = {
      ...data,
      date: formattedDate,
    };

    setWeights((prev) => [...prev, newEntry]);

    console.log(weights);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-2 flex items-center justify-center rounded-md border-2 border-neutral-800 bg-neutral-900 py-1 text-center font-[family-name:var(--font-geist-sans)]"
    >
      <input
        type="number"
        placeholder="Kg"
        className="w-11 pl-2 text-xs outline-none"
        max={120}
        {...register("weight", { required: true })}
      />
      <button className="cursor-pointer pr-2 text-xs transition-colors duration-150 hover:text-neutral-600">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
};
