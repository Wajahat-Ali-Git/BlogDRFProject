import SportsImg from "../assets/sports.jpg";
import EsportsImg from "../assets/Esports.jpg";
import cricket from "../assets/cricket.jpeg";
import entertainment from "../assets/entertainment.jpeg";
import others from "../assets/others.png";

export const categories = [
  {
    title: "Sports",
    image: SportsImg,
    bg: "bg-green-600/50",
    route: "/posts?category=sports",
    slug: "sports",
  },
  {
    title: "Esports",
    image: EsportsImg,
    bg: "bg-black/50",
    route: "/posts?category=e-sports",
    slug: "e-sports",
  },
  {
    title: "Cricket",
    image: cricket,
    bg: "bg-red-600/50",
    route: "/posts?category=cricket",
    slug: "cricket",
  },
  {
    title: "Entertainment",
    image: entertainment,
    bg: "bg-orange-600/50",
    route: "/posts?category=entertainment",
    slug: "entertainment",
  },
  {
    title: "Others",
    image: others,
    bg: "bg-gray-600/50",
    route: "/posts?category=",
    slug: "others",
  },
];
