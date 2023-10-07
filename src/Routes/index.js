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
import Announces from "../app/Announce";
import NewAnnounce from "../app/Announce/NewAnnounce";
import Lessons from "../app/Lesson";
import { NewLesson } from "../app/Lesson/NewLesson";
import { EditLesson } from "../app/Lesson/EditLesson";
import { Settings } from "../app/Setting";
import { NewSetting } from "../app/Setting/NewSetting";
import { EditSetting } from "../app/Setting/EditSetting";
import { NewType } from "../app/Type/NewType";
import { EditType } from "../app/Type/EditType";
import { Type } from "../app/Type";
import { GroupLesson } from "../app/GroupLesson";
import { NewGroupLesson } from "../app/GroupLesson/NewGroupLesson";

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
      <Route
        path={ROUTES.ADMIN.ANNOUNCE.HOME}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <Announces />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.ANNOUNCE.NEW_ANNOUNCE}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <NewAnnounce />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.LESSON.HOME}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <Lessons />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.LESSON.NEW_LESSON}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <NewLesson />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
       <Route
        path={ROUTES.ADMIN.LESSON.EDIT_LESSON}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <EditLesson />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.SETTING.HOME}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <Settings />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.SETTING.NEW_SETTING}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <NewSetting />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.SETTING.EDIT_SETTING}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <EditSetting />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.TYPE.HOME}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <Type />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.TYPE.NEW_TYPE}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <NewType />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.TYPE.EDIT_TYPE}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <EditType />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.GROUP_LESSON.HOME}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <GroupLesson />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
       <Route
        path={ROUTES.ADMIN.GROUP_LESSON.NEW_GROUP_LESSON}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <NewGroupLesson />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};