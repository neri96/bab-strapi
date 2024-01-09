import { useNavigate } from "react-router-dom";

import Button from "../../../components/Button";

import "./CafeIntro.scss";

const CafeIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="cafe">
      <div className="cafe__intro">
        <div className="cafe__details">
          <div className="cafe__title">
            <h1>Cafe</h1>
          </div>
          <div className="cafe__hours">
            <h2>Hours: Tue – Sat: 11 am – 4:00 pm</h2>
          </div>
          {/* <div className="cafe__descr">
            <h3></h3>
          </div> */}
          <div className="cafe__btn">
            <Button
              additionalStyle={{
                height: "50px",
                width: "120px",
                fontSize: "17px",
              }}
              handleClick={() => navigate("/menu")}
            >
              Menu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeIntro;
