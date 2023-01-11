import { User } from '../../models/user';
import { IGetUserByIdRepository } from './iget-users';
import { MongoClient } from '../../database/mongodb';
import { MongoUser } from '../../models/type-user';

export class MongoGetUserByIdRepository implements IGetUserByIdRepository {
    async getUserById(): Promise<User> {
        const user = await MongoClient.db.collection<MongoUser>("users").findOne({ _id: 'userid'})
        return user
    }
    
}