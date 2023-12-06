export interface LoginStrategy {
  login: (code: string) => Promise<any>;
  getToken: (code: string) => Promise<any>;
  getUser: (accessToken: string) => Promise<any>;
}
