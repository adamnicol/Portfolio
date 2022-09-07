import Home from "./components/Home";
import ViewPost from "./components/ViewPost";

const routes = [
  { path: "/", main: <Home />, aside: undefined },
  { path: "*", main: 404 },
  { path: "/news", main: <Home />, aside: undefined },
  { path: "/news/:id", main: <ViewPost />, aside: undefined },
  { path: "/about", main: undefined, aside: undefined },
  { path: "/projects", main: undefined, aside: undefined },
  { path: "/projects/:id", main: undefined, aside: undefined },
  { path: "/contact", main: undefined, aside: undefined },
  { path: "/login", main: undefined, aside: undefined },
  { path: "/register", main: undefined, aside: undefined },
];

export default routes;
