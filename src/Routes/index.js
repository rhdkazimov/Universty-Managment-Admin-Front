import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./consts";
import { Login } from "../app/Auth";
import { NotFound } from "../app/components/NotFound";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.ADMIN.LOGIN} element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
