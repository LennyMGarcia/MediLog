import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoPrivate from "../Layout/NoPrivate";
import LandingPage from "../Pages/LandingPage/LandingPage";
import Register from "../Pages/Register/Components/Register";
import Profile from "../Pages/Profile/Components/Profile";
import MyProfile from "../Pages/Profile/Components/MyProfile";
import Settings from "../Pages/Settings/Components/Settings";
import Appearance from "../Pages/Settings/Components/SettingOptions/appearance";
import DeleteAccount from "../Pages/Settings/Components/SettingOptions/DeleteAccount";
import ChangePassword from "../Pages/Settings/Components/SettingOptions/ChangePassword";
import ChangePlan from "../Pages/Settings/Components/SettingOptions/ChangePlan";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoPrivate />}>
          <Route index element={<LandingPage />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/profile"} element={<MyProfile />} />
          <Route path={"/pacientes/:idOrName"} element={<Profile />} />
          <Route path={"/settings"} element={<Settings/>}/>
          <Route path={"/settings/appearance"} element={<Appearance/>}/>
          <Route path={"/settings/deleteAccount"} element={<DeleteAccount/>}/>
          <Route path={"/settings/changePassword"} element={<ChangePassword/>}/>
          <Route path={"/settings/changePlan"} element={<ChangePlan/>}/>
        </Route>
      </Routes>
    </Router>
  );
}
