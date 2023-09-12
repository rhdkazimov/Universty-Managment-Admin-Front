import { AdminAuthService } from "./Auth";

export const useService = () => {
  const services = {
    userAuthService: new AdminAuthService(),
  };

  return services;
};
