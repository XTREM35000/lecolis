interface LoginResponse {
  user: User;
  token: string;
}

interface AuthResponse {
  user: User;
}

declare module "#app" {
  interface PageMeta {
    auth?: boolean;
  }
}

export {};
