import { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { useUpdateOrderMutation } from "../api/services/order";

import PageLayout from "../layout/PageLayout";
import Loading from "../components/Loading";

import useCartData from "../hooks/useCartData";

import * as storage from "../utils/localStorage";

const Success = () => {
  const navigation = useNavigate();
  const location = useLocation();

  const sessionId = location.search.split("?session_id=")[1];

  const [mutate] = useUpdateOrderMutation();

  const { modifyCartData } = useCartData();

  useEffect(() => {
    (async () => {
      const data = await mutate(sessionId).unwrap();

      if (data.success) {
        modifyCartData(() => storage.clearCart());

        navigation("/", { state: { orderCompleted: true } });
      } else if (data.completed) {
        // means it's been completed already at some point before
        navigation("/");
      }
    })();
  }, []);

  return (
    <PageLayout title="Success" fixedHeight={true} noPadding={true}>
      <Loading pageLoading />
    </PageLayout>
  );
};

export default Success;
