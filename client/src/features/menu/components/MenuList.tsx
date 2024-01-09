import MenuDetails from "./MenuDetails";
import Loading from "../../../components/Loading";

import { useGetMenuQuery } from "../../../api/services/menu";

import "./MenuList.scss";

const MenuList = () => {
  const { data, isLoading } = useGetMenuQuery(undefined);

  if (isLoading) return <Loading />;

  return data?.content ? (
    <div className="menu__list">
      <div className="menu__body">
        {data.content.map((menuData) => {
          return <MenuDetails key={menuData.id} data={menuData} />;
        })}
      </div>
    </div>
  ) : null;
};

export default MenuList;
