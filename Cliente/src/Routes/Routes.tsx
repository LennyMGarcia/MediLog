import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoPrivate from "../Layout/NoPrivate";
import LandingPage from "../Pages/LandingPage/LandingPage";
import Register from "../Pages/Register/Components/Register";
import Profile from "../Pages/Profile/Components/Profile";
import Settings from "../Pages/Settings/Components/Settings";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoPrivate />}>
          <Route index element={<LandingPage />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/profile/:idOrName"} element={<Profile/>}/>
          <Route path={"/settings"} element={<Settings/>}/>
        </Route>
      </Routes>
    </Router>
  );
}
