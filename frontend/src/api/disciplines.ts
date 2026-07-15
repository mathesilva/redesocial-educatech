import { apiRequest, buildQueryString } from "./client";
import type { DisciplineDto, PaginatedResponse } from "../types/api";

export const disciplinesApi = {
  list: () =>
    apiRequest<PaginatedResponse<DisciplineDto>>(
      `/api/disciplinas${buildQueryString({ pagina: 1, limite: 100 })}`,
      { authenticated: false },
    ),
};
