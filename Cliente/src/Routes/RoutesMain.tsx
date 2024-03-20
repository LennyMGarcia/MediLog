import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoPrivate from "../Layout/NoPrivate";
import LandingPage from "../Pages/LandingPage/LandingPage";
import Register from "../Pages/Register/Components/Register";
import Private from "../Layout/Private";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyProfile from "../Pages/Profile/Components/MyProfile";
import Profile from "../Pages/Profile/Components/Profile";
import Casos from "../Pages/Casos/Casos";
import Patients from "../Pages/Pacientes/Patients";
import Settings from "../Pages/Settings/Components/Settings";
import Appearance from "../Pages/Settings/Components/SettingOptions/appearance";
import DeleteAccount from "../Pages/Settings/Components/SettingOptions/DeleteAccount";
import ChangePassword from "../Pages/Settings/Components/SettingOptions/ChangePassword";
import ChangePlan from "../Pages/Settings/Components/SettingOptions/ChangePlan";
import NotFoundPage from "../Pages/Error404";
import SpecificCase from "../Pages/specificCase/Components/SpecificCase";
import Consultation from "../Pages/specificCase/Components/pages/Consultattion";
import Surgery from "../Pages/specificCase/Components/pages/surgery";

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
          <Route path="/pacientes" element={<Patients />} />
          <Route path={"/pacientes/:idOrName"} element={<Profile />} />
          <Route path={"/cases"} element={<Casos />} />
          <Route path={"/settings"} element={<Settings />} />
          <Route path={"/settings/appearance"} element={<Appearance />} />
          <Route path={"/settings/deleteAccount"} element={<DeleteAccount />} />
          <Route
            path={"/settings/changePassword"}
            element={<ChangePassword />}
          />
          <Route path={"/settings/changePlan"} element={<ChangePlan />} />
          <Route path={"/cases/:id"} element={<SpecificCase/>}/>
          <Route path={"/cases/case/consultation"} element={<Consultation/>}/>
          <Route path={"/cases/case/surgery"} element={<Surgery/>}/>
        </Route>
        <Route path="*" element={<NotFoundPage/>}/>

      </Routes>
    </BrowserRouter>
  );
}
