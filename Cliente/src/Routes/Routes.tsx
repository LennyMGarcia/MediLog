import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoPrivate from "../Layout/NoPrivate";
import LandingPage from "../Pages/LandingPage/LandingPage";
import Register from "../Pages/Register/Components/Register";
import Profile from "../Pages/Profile/Components/Profile";
import MyProfile from "../Pages/Profile/Components/MyProfile";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoPrivate />}>
          <Route index element={<LandingPage />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/profile"} element={<MyProfile />} />
          <Route path={"/pacientes/:idOrName"} element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}
