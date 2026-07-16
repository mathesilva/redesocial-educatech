import type { ApiErrorResponse, ApiSuccess } from "../types/api";

const TOKEN_STORAGE_KEY = "educatech.jwt";
const UNAUTHORIZED_EVENT = "educatech:unauthorized";

export class ApiError extends Error {
  public readonly status: number;
  public readonly details?: unknown[];

  constructor(message: string, status: number, details?: unknown[]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

const getApiBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL;

  if (!url) {
    throw new ApiError("VITE_API_URL nao configurada.", 0);
  }

  return String(url).replace(/\/$/, "");
};

export const getStoredToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

export const setStoredToken = (token: string) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const clearStoredToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const addUnauthorizedListener = (listener: () => void) => {
  window.addEventListener(UNAUTHORIZED_EVENT, listener);
  return () => window.removeEventListener(UNAUTHORIZED_EVENT, listener);
};

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  authenticated?: boolean;
};

export async function apiRequest<T>(
  path: string,
  { body, authenticated = true, headers, ...options }: RequestOptions = {},
): Promise<T> {
  const requestHeaders = new Headers(headers);

  if (body !== undefined) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (authenticated) {
    const token = getStoredToken();
    if (token) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiSuccess<T>
    | ApiErrorResponse
    | null;

  if (!response.ok || !payload?.sucesso) {
    const message =
      payload && "mensagem" in payload
        ? payload.mensagem
        : "Nao foi possivel comunicar com a API.";
    const details = payload && "erros" in payload ? payload.erros : undefined;
    const mensagemDetalhada = extrairMensagemDeValidacao(details) ?? message;

    if (response.status === 401 && authenticated) {
      clearStoredToken();
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    }

    throw new ApiError(mensagemDetalhada, response.status, details);
  }

  return payload.dados;
}

// Erros de validacao (Zod) trazem a mensagem especifica de cada campo em "erros";
// a API tambem envia uma "mensagem" generica de topo (ex: "Dados invalidos."), que
// sozinha nao diz ao usuario o que precisa ser corrigido.
function extrairMensagemDeValidacao(erros: unknown[] | undefined): string | undefined {
  const primeiroErro = erros?.[0];

  if (
    primeiroErro &&
    typeof primeiroErro === "object" &&
    "message" in primeiroErro &&
    typeof (primeiroErro as { message: unknown }).message === "string"
  ) {
    return (primeiroErro as { message: string }).message;
  }

  return undefined;
}

export const buildQueryString = (params: Record<string, string | number | undefined>) => {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      search.set(key, String(value));
    }
  });

  const query = search.toString();
  return query ? `?${query}` : "";
};
