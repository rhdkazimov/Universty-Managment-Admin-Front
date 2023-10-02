import { AdminAnnounceService } from "./Announce";
import { AdminAuthService } from "./Auth";
import { AdminGroupService } from "./Group";
import { AdminSpecialtyService } from "./Specialty";

export const useService = () => {
  const services = {
    userAuthService: new AdminAuthService(),
    adminGroupService: new AdminGroupService(),
    adminSpecialtyService :new AdminSpecialtyService(),
    adminAnnounceService: new AdminAnnounceService()
  };

  return services;
};
