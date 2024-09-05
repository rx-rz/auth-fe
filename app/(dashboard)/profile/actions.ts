import { handleApiCall } from "@/lib/utils";
import {
  UpdateAdminDto,
  UpdateAdminEmailDto,
  UpdateAdminPasswordDto,
} from "@/schemas/admin.schemas";
import * as ResponseTypes from "../_core/response-types";
import { api } from "@/lib/axios";

export const updateAdminEmail = (body: UpdateAdminEmailDto) => {
  return handleApiCall<ResponseTypes.UpdateAdminEmailResponse>(
    api.put("/admin/update-email", body)
  );
};

export const updateAdminPassword = (body: UpdateAdminPasswordDto) => {
  return handleApiCall<ResponseTypes.UpdateAdminPasswordResponse>(
    api.put("/admin/update-password", body)
  );
};

export const updateAdminDetails = (body: UpdateAdminDto) => {
  return handleApiCall<ResponseTypes.UpdateAdminDetailsResponse>(
    api.put("/admin/update-details", body)
  );
};

export const logoutAdmin = () => {
  return handleApiCall<ResponseTypes.LogoutAdminResponse>(
    api.get("/admin/logout")
  );
};
