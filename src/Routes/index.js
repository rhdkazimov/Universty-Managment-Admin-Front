import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./consts";
import { Login } from "../app/Auth";
import { NotFound } from "../app/components/NotFound";
import { ProtectedLoginRouter } from "../app/components/ProtectedLoginRouter";
import Home from "../app/Admin";
import { ProtectedRouter } from "../app/components/ProtectedRouter";
import SidebarWithHeader from "../app/components/sidebar/SideBar";
import Group from "../app/group/Group";
import NewGroup from "../app/group/NewGroup";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.ADMIN.LOGIN}
        element={
          <ProtectedLoginRouter>
            <Login />
          </ProtectedLoginRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.HOME}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <Home />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.GROUP}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <Group />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.NEW_GROUP}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <NewGroup />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
