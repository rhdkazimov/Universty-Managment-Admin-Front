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
import { EditGroupLesson } from "../app/GroupLesson/EditGroupLesson";
import { Specialty } from "../app/Specialty";
import { NewSpecilty } from "../app/Specialty/NewSpecialty";
import { EditSpecialty } from "../app/Specialty/EditSpecialty";
import { Faculty } from "../app/Faculty";
import { NewFaculty } from "../app/Faculty/NewFaculty";
import { EditFaculty } from "../app/Faculty/EditFaculty";
import { Teachers } from "../app/Teacher";
import { NewTeacher } from "../app/Teacher/NewTeacher";
import { Students } from "../app/Student";
import { NewStudent } from "../app/Student/NewStudent";
import Dashboard from "../app/Admin";
import { AddAdmin } from "../app/Admin/AddAdmin";

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
              <Dashboard />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.CREATE_ADMIN}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <AddAdmin />
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
      <Route
        path={ROUTES.ADMIN.GROUP_LESSON.EDIT_GROUP_LESSON}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <EditGroupLesson />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.SPECIALTY.HOME}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <Specialty />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.SPECIALTY.NEW_SPECIALTY}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <NewSpecilty />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.SPECIALTY.EDIT_SPECIALTY}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <EditSpecialty />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.FACULTY.HOME}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <Faculty />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.FACULTY.NEW_FACULTY}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <NewFaculty />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.FACULTY.EDIT_FACULTY}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <EditFaculty />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.TEACHER.HOME}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <Teachers />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.TEACHER.NEW_TEACHER}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <NewTeacher />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.STUDENT.HOME}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <Students />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.STUDENT.NEW_STUDENT}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <NewStudent />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
