import { ObjectId } from 'mongodb';
import { MongoClient } from '../../database/mongodb';
import { MongoUser } from '../../types/type-user';
import { User } from '../../models/user';
import { IDeleteUserRepository } from './idelete-user';

export class MongoDeleteUserRepository implements IDeleteUserRepository {
    async deleteUser(id: string): Promise<User> {
        const user = await MongoClient.db.collection<MongoUser>("users").findOne({_id: new ObjectId(id)})

        if(!user) {
            throw new Error("Usuário não foi encontrado")
        }

        const { deletedCount } = await MongoClient.db.collection("users").deleteOne({ _id: new ObjectId(id) });

        if (!deletedCount) {
            throw new Error("Não foi possivel atualizar o usuário");
          }

        if(!user) {
            throw new Error("Não foi possivel deletar o usuário")
        }
        
        return user
    }
}