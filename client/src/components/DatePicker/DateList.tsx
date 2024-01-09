import { Dispatch, SetStateAction, useCallback } from "react";

import { getDaysInMonth } from "./utils/getDayList";

const DateList = ({
  day,
  setDay,
  month,
  dayInterval,
}: {
  day: string;
  month: string;
  setDay: Dispatch<SetStateAction<string>>;
  dayInterval: number;
}) => {
  const getYear = useCallback((month: string) => {
    const now = new Date();

    if (Number(month) < 5) now.setFullYear(now.getFullYear() + 1);

    return now.getFullYear();
  }, []);

  return (
    <div className="date-time-picker__day">
      <ul>
        {getDaysInMonth(Number(month), getYear(month), dayInterval).map(
          ({ id, day: dayElem }: { id: string; day: Date }) => {
            const currentDay = dayElem.getDate();
            const dayOfWeek = dayElem.toLocaleString("en-us", {
              weekday: "long",
            });

            const isAvailable = true; // to be updated

            return (
              <li
                key={id}
                className={`${!isAvailable ? "date-unavailable" : ""} ${
                  day === String(currentDay) ? "date-chosen" : ""
                }`}
                onClick={() =>
                  isAvailable ? setDay(String(currentDay)) : undefined
                }
              >
                {dayOfWeek}, {currentDay}
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default DateList;
