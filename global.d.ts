export {};

declare global {
  interface EnvObject {
    PORT: number;
    NODE_ENV: string;
  }

  interface IObjectLiteral {
    [key: string]: any;
  }

  type Database = {
    collection: (collection: string) => IObjectLiteral | never;
  };
}
