import ReactDOM from "react-dom";

import { motion } from "framer-motion";

import { useGetModifiersQuery } from "../../../api/services/modifiers";

import ModifierDetails from "./ModifierDetails";
import Close from "../../../components/Close";
import Loading from "../../../components/Loading";

import useFreezeBackground from "../../../hooks/useFreezeBackground";

import "./ModifierList.scss";

import { IProduct } from "../../../api/services/products";

const ModifierList = ({
  productId,
  handleList,
}: {
  productId: number;
  handleList: () => void;
}) => {
  useFreezeBackground();

  const { data: modifiers, isLoading } = useGetModifiersQuery({
    id: productId,
  });

  if (isLoading) {
    return <Loading pageLoading={true} />;
  }

  const content = (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.8, y: "-50%", x: "-50%" },
        visible: {
          y: "-50%",
          x: "-50%",
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.3,
            delayChildren: 0.3,
            staggerChildren: 0.2,
          },
        },
        exit: { opacity: 0 },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="modifiers__list"
    >
      <div className="modifiers__list__close" onClick={handleList}>
        <Close />
      </div>
      <div className="modifiers__list__body">
        {modifiers?.content.map((modifier: IProduct) => {
          return (
            <ModifierDetails
              key={modifier.id}
              id={modifier.id}
              modifier={modifier}
            />
          );
        })}
      </div>
    </motion.div>
  );

  const rootElement = document.querySelector("#list");
  return rootElement ? ReactDOM.createPortal(content, rootElement) : null;
};

export default ModifierList;
