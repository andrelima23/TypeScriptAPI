import { User } from '../../models/user';
import { IGetUsersRepository } from './iget-users';
import { MongoClient } from '../../database/mongodb';
import { MongoUser } from '../../models/type-user';

export class MongoGetUsersRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {

        const users = await MongoClient.db.collection<MongoUser>("users").find({}).toArray();
            
        return users.map(({ _id, ...rest }) => ({
            ...rest,
            id: _id.toHexString(),
          }));
    }
    
}