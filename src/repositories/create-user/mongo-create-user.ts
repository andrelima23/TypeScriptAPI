import { MongoClient } from '../../database/mongodb';
import { User } from '../../models/user';
import { ICreateUserParams, ICreateUserRepository } from './icreate-user';
import { MongoUser } from '../../models/type-user';

export class MongoCreateUserRepository implements ICreateUserRepository {
    async createUser(params: ICreateUserParams): Promise<User> {
        const { insertedId } = await MongoClient.db
            .collection("users")
            .insertOne(params);

        const user = await MongoClient.db
            .collection<MongoUser>("users")
            .findOne({ _id: insertedId });

        if (!user) {
            throw new Error("User not created");
        }
        
        return user
    }

}