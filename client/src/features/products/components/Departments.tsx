import { useEffect, Dispatch, SetStateAction, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { useGetDepartmentsQuery } from "../../../api/services/department";

import { RxCaretDown } from "react-icons/rx";

import usePopup from "../../../hooks/usePopup";

import "./Departments.scss";

interface IDep {
  id: number;
  title: string;
}

const DepartmentList = ({
  currentDepartment,
  setCurrentDepartment,
}: {
  currentDepartment: string;
  setCurrentDepartment: Dispatch<SetStateAction<string>>;
}) => {
  const { ref, handleToggle, popupOpen: depListOpen } = usePopup();
  const location = useLocation();

  const { data } = useGetDepartmentsQuery(undefined);

  useEffect(() => {
    if (data) {
      setCurrentDepartment(
        location.state?.title === "market"
          ? data.content[1]?.title
          : data.content[0]?.title
      );
    }
  }, [data, location, setCurrentDepartment]);

  return (
    <div className="departments">
      <div ref={ref} className="departments__mobile" onClick={handleToggle}>
        <h4>{currentDepartment}</h4>
        <div
          className={`departments__mobile__caret ${depListOpen ? "open" : ""}`}
        >
          <RxCaretDown size={30} />
        </div>
      </div>
      <div className={`departments__list ${depListOpen ? "open" : ""}`}>
        {data?.content.map((department: IDep) => {
          const depTitle = department.title;

          return (
            <div
              key={department.id}
              className={
                depTitle === "take out"
                  ? `departments__takeout ${
                      currentDepartment === "take out" ? "chosen" : ""
                    }`
                  : `departments__details ${
                      depTitle === currentDepartment ? "chosen" : ""
                    }`
              }
              onClick={() => {
                setCurrentDepartment(depTitle);
              }}
            >
              <h4>{depTitle}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentList;
