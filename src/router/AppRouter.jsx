import { Routes, Route } from "react-router-dom";
import { AuthRoutes } from "../auth/routes";
import { JournalRoutes } from "../journal/routes";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Login & Register */}
      <Route path="auth/*" element={<AuthRoutes />} />
      {/* Jornal Private Routes */}
      <Route path="/*" element={<JournalRoutes />} />
    </Routes>
  );
};
