import { ObjectId } from 'mongodb';
import { MongoClient } from '../../database/mongodb';
import { MongoUser } from '../../models/type-user';
import { User } from '../../models/user';
import { IDeleteUserRepository } from './idelete-user';

export class MongoDeleteUserRepository implements IDeleteUserRepository {
    async deleteUser(id: string): Promise<User> {
        const user = await MongoClient.db.collection<MongoUser>("users").findOne({_id: new ObjectId(id)})

        if(!user) {
            throw new Error("Usuário não foi encontrado")
        }

        const { deletedCount } = await MongoClient.db.collection("users").deleteOne({ _id: new ObjectId(id) });

        if(!user) {
            throw new Error("Usuário não foi deletado")
        }

        const { _id, ...rest } = user;
        
        return user
    }

}