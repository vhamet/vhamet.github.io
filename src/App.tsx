import { Link, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Signal, computed, effect, signal } from "@preact/signals-react";

import Header from "./components/Header.tsx";
import Home from "./pages/Home";
import TicTacToe from "./pages/TicTacToe";
import Perspective from "./pages/Perspective/index.tsx";
import Pokemon from "./pages/Pokemon/index.tsx";
import MetaInterview from "./pages/MetaInterview/index.tsx";
import Dot from "./pages/DotInterview/index.tsx";
import RickMorty from "./pages/RickMorty";
import CachedRickMorty from "./pages/CachedRickMorty";
import BreakingBad from "./pages/BreakingBad/index.tsx";
import Timer from "./pages/Timer/index.tsx";
import GreenLightRedLight from "./pages/GreenLightRedLight/index.tsx";
import TypingGame from "./pages/TypingGame/index.tsx";
import MemoryGame from "./pages/MemoryGame/index.tsx";
import DirectoryTreeExample from "./pages/DirectoryTreeExample/index.tsx";
import ScrollableExample from "./pages/ScrollableExample/index.tsx";
import WindowSize from "./pages/WindowSize/index.tsx";
import ContextModuleFunctions from "./pages/ContextModuleFunctions/index.tsx";
import Queues from "./pages/Queues/index.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import Wordle from "./pages/Wordle/index.tsx";
import TodoList, { Todo } from "./pages/TodoList/index.tsx";
import AnimatedBurgerMenu from "./components/AnimatedBurgerMenu/index.tsx";

import "./App.scss";

const routes = [
  { path: "/tictactoe", text: "Tic Tac Toe" },
  { path: "/perspective", text: "Perspective" },
  { path: "/pokemon", text: "Pokemon" },
  { path: "/meta", text: "Meta Interview" },
  { path: "/dot", text: "Dot" },
  { path: "/rickmorty", text: "Rick & Morty" },
  { path: "/cachedrickmorty", text: "Cached R&M" },
  { path: "/breakingbad", text: "Breaking Bad" },
  { path: "/timer", text: "Timer" },
  { path: "/greenred", text: "Green Light - Red Light" },
  { path: "/typinggame", text: "Typing Game" },
  { path: "/memorygame", text: "Memory Game" },
  { path: "/directorytree", text: "Directory Tree" },
  { path: "/scrollable", text: "Scrollable" },
  { path: "/windowsize", text: "Window Size" },
  { path: "/contextmodulefunctions", text: "Context Module Functions" },
  { path: "/queues", text: "Queues" },
  { path: "/wordle", text: "Wordle" },
  { path: "/todos", text: "Todo List" },
].sort((r1, r2) => r1.text.localeCompare(r2.text));

// TODO
// https://advanced-react-patterns-next.netlify.app/1
// https://epic-react-exercises.vercel.app/react/patterns/2
// https://csswizardry.com/2023/09/the-ultimate-lqip-lcp-technique/
// https://epic-react-exercises.vercel.app/react/patterns/2

// https://preactjs.com/blog/introducing-signals/
const TODOS_STORAGE_KEY = "LOCAL_TODOS";
const getTodos = () => {
  const value = localStorage.getItem(TODOS_STORAGE_KEY);
  if (!value) return [];

  return JSON.parse(value) as Todo[];
};
const todos = signal(getTodos());

effect(() =>
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos.value))
);

const App = () => {
  return (
    <HelmetProvider>
      <UserProvider>
        <div className="app">
          <Header />
          <main>
            <AppNavigation todos={todos} />
            <section className="app__content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="tictactoe" element={<TicTacToe />} />
                <Route path="perspective" element={<Perspective />} />
                <Route path="pokemon" element={<Pokemon />} />
                <Route path="meta" element={<MetaInterview />} />
                <Route path="dot" element={<Dot />} />
                <Route path="rickmorty" element={<RickMorty />} />
                <Route path="cachedrickmorty" element={<CachedRickMorty />} />
                <Route path="breakingbad" element={<BreakingBad />} />
                <Route path="timer" element={<Timer />} />
                <Route path="greenred" element={<GreenLightRedLight />} />
                <Route path="typinggame" element={<TypingGame />} />
                <Route path="memorygame" element={<MemoryGame />} />
                <Route
                  path="directorytree"
                  element={<DirectoryTreeExample />}
                />
                <Route path="scrollable" element={<ScrollableExample />} />
                <Route path="windowsize" element={<WindowSize />} />
                <Route
                  path="contextmodulefunctions"
                  element={<ContextModuleFunctions />}
                />
                <Route path="queues" element={<Queues />} />
                <Route path="wordle" element={<Wordle />} />
                <Route path="todos" element={<TodoList todos={todos} />} />
              </Routes>
            </section>
          </main>
        </div>
      </UserProvider>
    </HelmetProvider>
  );
};

type AppNavigationProps = { todos: Signal<Todo[]> };

const AppNavigation = ({ todos }: AppNavigationProps) => {
  const location = useLocation();
  const computedTodoCOunt = computed(
    () => todos.value.filter(({ done }) => !done).length
  );

  return (
    <section className="app__navigation">
      <AnimatedBurgerMenu />
      {routes.map(({ path, text }) => (
        <Link
          key={path}
          to={path}
          className={location.pathname === path ? "current" : ""}
        >
          {text}
          {text === "Todo List" && ` (${computedTodoCOunt})`}
        </Link>
      ))}
    </section>
  );
};

export default App;
