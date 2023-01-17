import { ObjectId } from 'mongodb';
import { MongoClient } from '../../database/mongodb';
import { MongoUser } from '../../types/type-user';
import { User } from '../../models/user';
import { IUpdateUserRepository, UpdateUserParams } from './iupdate-user';

export class MongoUpdateUserRepository implements IUpdateUserRepository {
    async updateUser(id: string, params: UpdateUserParams): Promise<User> {
        const atua = await MongoClient.db.collection("Users").updateOne({_id: new ObjectId(id)}, {$set: {...params}})
        const user = await MongoClient.db.collection<MongoUser>("users").findOne({_id: new ObjectId(id)})

        if(!user) {
            throw new Error('Não foi possivel atualizar o usuário')
        }
        
        console.log("Usuário atualizado")
        console.log(atua)

        return user
    }

}