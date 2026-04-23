import SportsImg from "../assets/sports.jpg";
import EsportsImg from "../assets/Esports.jpg";
import cricket from "../assets/cricket.jpeg";
import entertainment from "../assets/entertainment.jpeg";
import others from "../assets/others.png";

export const categories = [
  {
    // use translation key `category.<slug>` in components
    titleKey: "category.sports",
    label: "Sports",
    image: SportsImg,
    bg: "bg-green-600/50",
    route: "/posts?category=sports",
    slug: "sports",
  },
  {
    titleKey: "category.e-sports",
    label: "Esports",
    image: EsportsImg,
    bg: "bg-black/50",
    route: "/posts?category=e-sports",
    slug: "e-sports",
  },
  {
    titleKey: "category.cricket",
    label: "Cricket",
    image: cricket,
    bg: "bg-red-600/50",
    route: "/posts?category=cricket",
    slug: "cricket",
  },
  {
    titleKey: "category.entertainment",
    label: "Entertainment",
    image: entertainment,
    bg: "bg-orange-600/50",
    route: "/posts?category=entertainment",
    slug: "entertainment",
  },
  {
    titleKey: "category.others",
    label: "Others",
    image: others,
    bg: "bg-gray-600/50",
    route: "/posts?category=others",
    slug: "others",
  },
];
