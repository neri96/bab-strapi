import { useState, useEffect } from "react";
import { useGetNotificationQuery } from "../../api/services/notifs";

import Modal from "../Modal";

import {
  getNotifConfig,
  setNotifLimit,
  notifLimitRemove,
} from "../../utils/localStorage";

import "./style.scss";

const Notif = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const { data } = useGetNotificationQuery(undefined);

  const { isNotifOn, title, message, updatedAt } = data?.content || {};

  useEffect(() => {
    if (data?.content) {
      const notifConfig = getNotifConfig();

      if (isNotifOn) {
        if (!notifConfig || notifConfig?.updatedAt !== updatedAt) {
          notifConfig && notifLimitRemove();

          const timeout = setTimeout(() => {
            setIsActive(true);
          }, 1500);

          return () => clearTimeout(timeout);
        }
      } else {
        notifConfig && notifLimitRemove();
      }
    }
  }, [data]);

  const handleClick = () => {
    setIsActive(false);

    updatedAt && setNotifLimit(updatedAt);
  };

  return (
    <>
      {isActive ? (
        <Modal
          cancelButton={false}
          confirmBtnTitle="Ok"
          isForm={false}
          handleClick={handleClick}
        >
          <div className="notif">
            {title ? (
              <div className="notif__title">
                <h2>{title}</h2>
              </div>
            ) : null}
            <h4>{message}</h4>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Notif;
