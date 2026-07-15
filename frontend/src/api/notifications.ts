import { apiRequest } from "./client";
import type { NotificationDto } from "../types/api";

export const notificationsApi = {
  list: () => apiRequest<NotificationDto[]>("/api/notificacoes"),
  markAsRead: (id: string) =>
    apiRequest<NotificationDto>(`/api/notificacoes/${id}/lida`, {
      method: "PATCH",
    }),
};
