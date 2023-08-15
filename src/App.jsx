import GlobalStyles from "./styles/GlobalStyles";

import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Applayout from "./AppLayout";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route element={<Applayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/cabins" element={<Cabins />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
