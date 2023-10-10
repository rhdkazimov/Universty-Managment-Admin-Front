import { AdminAnnounceService } from "./Announce";
import { AdminAuthService } from "./Auth";
import { AdminFacultyService } from "./Faculty";
import { AdminGroupService } from "./Group";
import { AdminGroupLessonService } from "./GroupLesson";
import { AdminLessonService } from "./Lesson";
import { AdminSettingService } from "./Setting";
import { AdminSpecialtyService } from "./Specialty";
import { AdminStatisticService } from "./Statistic";
import { AdminStudentService } from "./Student";
import { AdminTeacherService } from "./Teacher";
import { AdminTypeService } from "./Type";

export const useService = () => {
  const services = {
    userAuthService: new AdminAuthService(),
    adminGroupService: new AdminGroupService(),
    adminSpecialtyService: new AdminSpecialtyService(),
    adminAnnounceService: new AdminAnnounceService(),
    adminLessonService: new AdminLessonService(),
    adminFacultyService: new AdminFacultyService(),
    adminSettingService: new AdminSettingService(),
    adminTypeService: new AdminTypeService(),
    adminGroupLessonService: new AdminGroupLessonService(),
    adminTeacherService: new AdminTeacherService(),
    adminStudentService: new AdminStudentService(),
    adminStatisticService: new AdminStatisticService(),
  };

  return services;
};
