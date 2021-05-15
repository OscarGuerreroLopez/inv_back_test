declare namespace Express {
  export interface Request {
    code: string;
    limit: number;
    skip: number;
    sort?: { [key: string]: any };
    where?: { [key: string]: any };
  }
}
