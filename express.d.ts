declare module 'express' {
  export interface Request {
    user: {
      id: string;
      login: string;
    };
  }
}
