declare module 'express' {
  export interface Request {
    user: {
      id: string;
      login: string;
    };
    cookies: any;
  }
  export interface Response {
    cookie: any;
    clearCookie: (cookie: string) => void;
  }
}
