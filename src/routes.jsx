import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, Courses, CourseManager, PackagesManager, Packages, Course, Player, Signals } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { Terms } from "@/pages/terms";
import { Boxes, GraduationCap, Handshake, Headset, SignalHigh, Video } from "lucide-react";
import ContactUs from "./pages/terms/ContactUs";
import { useAuth } from "./hooks/Auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};


export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <GraduationCap {...icon} />,
        name: "Courses",
        path: "/courses",
        element: <Courses />,
      },
      {
        icon: <GraduationCap {...icon} />,
        name: "Course",
        path: "/course/:id",
        element: <Course />,
      },
      {
        icon: <GraduationCap {...icon} />,
        name: "Courses Manager",
        path: "/courses-manager",
        element: <CourseManager />,
        role: "admin"
      },
      {
        icon: <Boxes {...icon} />,
        name: "Packages",
        path: "/packages",
        element: <Packages />,
      },
      {
        icon: <Boxes {...icon} />,
        name: "Packages Manager",
        path: "/packages-manager",
        element: <PackagesManager />,
        role: "admin"
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <SignalHigh {...icon} />,
        name: "signals",
        path: "/signals",
        element: <Signals />,
        role: "admin"
      },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      {
        icon: <Headset {...icon} />,
        name: "Contact Us",
        path: "/contact-us",
        element: <ContactUs />,
      },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
      {
        icon: <Video {...icon} />,
        name: "lesson",
        path: "/lesson/:id/course/:courseId",
        element: <Player />,
      }
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    title: "terms and conditions",
    layout: "terms",
    pages: [
      {
        icon: <Handshake {...icon} />,
        name: "terms and conditions",
        path: "/terms-and-conditions",
        element: <Terms />,
      },

    ]
  },
];

export default routes;
