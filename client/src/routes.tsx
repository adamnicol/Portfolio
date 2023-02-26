import { Article, News, NewsFilters } from "./pages/news";
import { useRoutes } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Home,
  ProjectFilters,
  ProjectList,
  SkillList,
} from "./pages";

export function MainRoutes() {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/news", element: <News /> },
    { path: "/news/:slug", element: <Article /> },
    { path: "/about", element: <About /> },
    { path: "/projects", element: <ProjectList /> },
    { path: "/experience", element: <Experience /> },
    { path: "/contact", element: <Contact /> },
  ]);
}

export function AsideRoutes() {
  return useRoutes([
    { path: "/", element: <NewsFilters /> },
    { path: "/news/*", element: <NewsFilters /> },
    { path: "/projects/*", element: <ProjectFilters /> },
    { path: "/experience/*", element: <SkillList /> },
  ]);
}
