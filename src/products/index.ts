export * from "./interfaces";
export * from "./validators";

import { DbAdapter } from "../utils";

const database: Database = DbAdapter();
