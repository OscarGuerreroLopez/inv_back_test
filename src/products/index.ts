// The functions in this file are independent from the framework that we use
// In a real app, like here, I woould separate the business logic like this from the framework
// Like that we could use express, nest, etc... this functions will not have to be modified
// since the params have nothing to do with the framework

export * from "./interfaces";
export * from "./validators";
export * from "./findProduct";
export * from "./removeProduct";
