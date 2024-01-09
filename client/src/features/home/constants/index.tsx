import { v4 as uuid } from "uuid";

export const directions = [
  {
    id: uuid(),
    title: "Market",
    image: "market.jpg",
    description: "",
    page: "market",
    passTitle: false,
  },
  {
    id: uuid(),
    title: "Cafe",
    image: "cafe.jpg",
    description: "",
    page: "cafe",
    passTitle: false,
  },
  {
    id: uuid(),
    title: "Take Out",
    image: "takeout.jpg",
    description: "",
    page: "market",
    passTitle: true,
  },
  {
    id: uuid(),
    title: "Catering",
    image: "catering.jpg",
    description: "",
    page: "catering",
    passTitle: false,
  },
];
