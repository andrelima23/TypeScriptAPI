import { User } from "./user"; 

export type MongoUser = Omit<User, "id">;