import { useRoutes } from "react-router-dom";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Experience from "./pages/Experience";
import Home from "./pages/Home";
import News from "./pages/News";
import NewsFilters from "./pages/news/Filters";
import Projects from "./pages/projects/ProjectList";
import ProjectFilters from "./pages/projects/Filters";
import SkillList from "./pages/aside/SkillList";
import ViewPost from "./pages/news/ViewPost";

export function MainRoutes() {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/news", element: <News /> },
    { path: "/news/:slug", element: <ViewPost /> },
    { path: "/about", element: <About /> },
    { path: "/projects", element: <Projects /> },
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
