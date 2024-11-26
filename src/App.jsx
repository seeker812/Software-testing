import Register from "./Register";
import Login from "./Login";
import Layout from "./Layout";
import RequireAuth from "./RequireAuth";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import LinkPage from "./LinkPage";
import Unauthorized from "./Unauthorized";
import Missing from "./Missing";

import StudentDetails from "./StudentDetails";
import GetDetails from "./GetDetails";
const ROLES = {
  User: "User",
  Editor: "Editor",
  Admin: "Admin",
};
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route
          element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
        >
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="editor" element={<StudentDetails />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<GetDetails />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
