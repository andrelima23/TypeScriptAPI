import { MongoClient } from '../../database/mongodb';
import { User } from '../../models/user';
import { ICreateUserParams, ICreateUserRepository } from './icreate-user';
import { MongoUser } from '../../types/type-user';

export class MongoCreateUserRepository implements ICreateUserRepository {
    async createUser(params: ICreateUserParams): Promise<User> {
        const { insertedId } = await MongoClient.db
            .collection("users")
            .insertOne(params);

        const user = await MongoClient.db
            .collection<MongoUser>("users")
            .findOne({ _id: insertedId });

        if (!user) {
            throw new Error("Não foi possivel criar o usuário");
        }
        
        return user
    }

}