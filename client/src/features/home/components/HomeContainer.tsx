import { useLocation } from "react-router-dom";

import Intro from "./Intro";
import About from "./About";
import Bubbles from "../../../components/Bubbles";

import { directions } from "../constants";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";

export const HomeContainer = () => {
  const location = useLocation();

  const [completedPayment, setCompletedPayment] = useState<boolean>(false);

  useEffect(() => {
    if (location.state?.orderCompleted) {
      setCompletedPayment(true);
      window.history.replaceState({}, document.title);
    }
  }, []);

  return (
    <>
      {completedPayment ? (
        <Modal
          cancelButton={false}
          confirmBtnTitle="Ok"
          isForm={false}
          handleClick={() => {
            setCompletedPayment(false);
          }}
        >
          <div
            style={{
              padding: "10px 10px 0 10px",
              textAlign: "center",
              color: "#fff",
              lineHeight: "23px",
            }}
          >
            <h4>
              Your order has been successfully completed. Our team will start
              working on it as soon as possible
            </h4>
          </div>
        </Modal>
      ) : null}
      <>
        <Intro />
        <About />
        {/* <Bubbles clickable={true} content={directions} /> */}
      </>
    </>
  );
};
