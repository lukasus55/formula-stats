import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './pages/Loading';
import Navbar from "./components/Navbar";

const Home = lazy(() => import('./pages/Home'));
const Schedule  = lazy(() => import('./pages/Schedule'));
const Standings = lazy(() => import('./pages/Standings'));
const Drivers = lazy(() => import('./pages/Drivers'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const Settings = lazy(() => import('./pages/Settings'));
const More = lazy(() => import('./pages/More'));

function App() {

  const location = useLocation();

  const storedTheme = localStorage.getItem("theme");
  const storedTimeZone = localStorage.getItem("timeZone");
  if (storedTheme) {
    document.documentElement.classList.add(storedTheme);
  } else {
    // Default to system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.add(prefersDark ? 'dark' : 'light');
    localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
  }
  if (!storedTimeZone) {localStorage.setItem('timeZone', 'user');}
  
  return (
    <>
      <Navbar />
        <Suspense key={location.pathname.toString()} fallback={<Loading />}> 
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="standings" element={<Standings />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="drivers" element={<Drivers />} />
              <Route path="legal/cookie-policy" element={<CookiePolicy />} />
              <Route path="settings" element={<Settings />} />
              <Route path="more" element={<More />} />
              <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
    </>
  );
};

export default App;
