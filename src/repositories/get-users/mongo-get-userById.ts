import { User } from '../../models/user';
import { IGetUserByIdRepository } from './iget-users';
import { MongoClient } from '../../database/mongodb';
import { MongoUser } from '../../types/type-user';
import { ObjectId } from 'mongodb';

export class MongoGetUserByIdRepository implements IGetUserByIdRepository {
    async getUserById(id: string): Promise<User> {
        const user = await MongoClient.db.collection<MongoUser>("users").findOne({_id: new ObjectId(id)})
        
        if(!user) {
            throw new Error("Usuári não encontrado")
        }

        return user
    }
    
}