import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Available Money",
    value: "$600",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Today's Users",
    value: "5",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: UserIcon,
    title: "New Teammates",
    value: "10",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Pending money ",
    value: "$100",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
