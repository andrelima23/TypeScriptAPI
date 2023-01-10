import {MongoClient as MC, Db} from 'mongodb';

export const MongoClient = {
    
    client: undefined as unknown as MC,
    db: undefined as unknown as Db,

    async connect(): Promise<void> {
        const url = process.env.MONGODB_URL || "localhost:8001";
        const username = process.env.MONGODB_USERNAME;
        const password = process.env.MONGODB_PASSWORD;
        
        const client = new MC(url, { auth: { username, password }});
        const db = client.db("UsersDB");
        this.client = client;
        this.db = db;

        console.log("Conectado com o MongoDB")
    }
}