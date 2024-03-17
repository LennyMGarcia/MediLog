import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoPrivate from "../Layout/NoPrivate";
import LandingPage from "../Pages/LandingPage/LandingPage";
import Register from "../Pages/Register/Components/Register";
import Private from "../Layout/Private";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyProfile from "../Pages/Profile/Components/MyProfile";
import Profile from "../Pages/Profile/Components/Profile";
import Casos from "../Pages/Casos/Casos";

export default function RoutesMain() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NoPrivate />}>
          <Route index element={<LandingPage />} />
          <Route path={"register"} element={<Register />} />
        </Route>
        <Route path="/" element={<Private />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path={"/profile"} element={<MyProfile />} />
          <Route path={"/pacientes/:idOrName"} element={<Profile />} />
          <Route path={"/cases"} element={<Casos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
