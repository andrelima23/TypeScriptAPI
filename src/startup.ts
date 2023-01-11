import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import fs from 'fs';
import { config as useDotEnv } from 'dotenv';
import { GetUsersController } from './controllers/get-users-controller';
import { MongoGetUsersRepository } from './repositories/get-users/mongo-get-users';
import { MongoClient } from './database/mongodb';
import { MongoGetUserByIdRepository } from './repositories/get-users/mongo-get-userById';
import { GetUserByIdController } from './controllers/get-user-by-id-controller';

export const App = async () => {
    const app = express();
    const PORT = 9000;
    
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(express.json());
    useDotEnv()
    
    await MongoClient.connect();
    
    const data = [{
        n1: 456,
        n2: 456
    }];
    
    app.listen(PORT, () => console.log('> Servidor rodando... \n> Acesse localhost:9000/home/'));
    
    
    
    app.get("/home", (req, res) => {
        const rotas = {
            home: 'http://localhost:9000/home/',
            users:'http://localhost:9000/users/',
            post: 'http://localhost:9000/post/'
        }
    
        return res.send(rotas)
    })
    
    app.get("/users", async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepository()
        const getUsersController = new GetUsersController(mongoGetUsersRepository)
        const response = await getUsersController.handle()
    
        res.status(response.statusCode).send(response.body)
    })

    app.get("/userbyid", async (req, res) => {
        const mongoGetUserByIdRepository = new MongoGetUserByIdRepository()
        const getUserByIdController = new GetUserByIdController(mongoGetUserByIdRepository)
        const response = await getUserByIdController.handle()
    
        res.status(response.statusCode).send(response.body)
    })
    
    app.post("/post", (req, res) => {
        const request = req.body;
    
        if (!request) {
            return res.status(400).end();
          }
        
        data.push(request)
    
        const gravar = JSON.stringify(data);
    
        fs.writeFile("log.txt", gravar, (error) => {
           if(error) console.log(error)
        })
        console.log(request)
    
        return res.send("Objeto enviado!")
    })

}


