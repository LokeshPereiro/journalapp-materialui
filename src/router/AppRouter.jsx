import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from "../auth/routes";
import { useCheckAuth } from "../hooks";
import { JournalRoutes } from "../journal/routes";
import { CheckingAuth } from "../ui/CheckingAuth";

export const AppRouter = () => {
  const { status } = useCheckAuth();
  if (status === "Checking") {
    return <CheckingAuth />;
  }
  return (
    <Routes>
      {/* Jornal Private Routes */}

      {status === "Authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="auth/*" element={<AuthRoutes />} />
      )}

      {/* Login & Register */}
      <Route path="/*" element={<Navigate to="auth/login" />} />
    </Routes>
  );
};
