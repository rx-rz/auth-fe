import { handleApiCall } from "@/lib/utils";
import {
  UpdateAdminDto,
  UpdateAdminEmailDto,
  UpdateAdminPasswordDto,
} from "@/schemas/admin.schemas";
import * as ResponseTypes from "./response-types";
import { api } from "@/lib/axios";

export const updateAdminEmailAction = (body: UpdateAdminEmailDto) => {
  return handleApiCall<ResponseTypes.UpdateAdminEmailResponse>(
    api.put("/admin/update-email", body)
  );
};

export const updateAdminPasswordAction = (body: UpdateAdminPasswordDto) => {
  return handleApiCall<ResponseTypes.UpdateAdminPasswordResponse>(
    api.put("/admin/update-password", body)
  );
};

export const updateAdminDetailsAction = (body: UpdateAdminDto) => {
  return handleApiCall<ResponseTypes.UpdateAdminDetailsResponse>(
    api.put("/admin/update-details", body)
  );
};

export const logoutAdminAction = () => {
  return handleApiCall<ResponseTypes.LogoutAdminResponse>(
    api.get("/admin/logout")
  );
};
