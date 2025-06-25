import { Dispatch, SetStateAction } from "react";

export type WeightType = {
  weight: number;
  day: number;
  month: number;
  year: number;
};

export type WeightsType = {
  weights: WeightType[];
  setWeights: Dispatch<SetStateAction<WeightType[]>>;
};

export type ShownWeekStartType = {
  shownWeekStart: Date;
  setShownWeekStart: Dispatch<SetStateAction<Date>>;
};

export type ShownWeekType = {
  shownWeek: string;
  setShownWeek: Dispatch<SetStateAction<string>>;
};

export type ShownMonthType = {
  shownMonth: string;
  setShownMonth: Dispatch<SetStateAction<string>>;
};

export type ShownQuarterType = {
  shownQuarter:
    | "January - March"
    | "April - June"
    | "July - September"
    | "October - December";
  setShownQuarter: Dispatch<
    SetStateAction<
      | "January - March"
      | "April - June"
      | "July - September"
      | "October - December"
    >
  >;
};

export type ShownYearType = {
  shownYear: number;
  setShownYear: Dispatch<SetStateAction<number>>;
};

export type ShownAllType = {
  shownAll: string;
  setShownAll: Dispatch<SetStateAction<string>>;
};

export type SelectedInfoType = {
  selectedInfo: "Week" | "Month" | "Quarter" | "Year" | "All";
  setSelectedInfo: Dispatch<
    SetStateAction<"Week" | "Month" | "Quarter" | "Year" | "All">
  >;
};
