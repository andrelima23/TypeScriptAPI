import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import { config as useDotEnv } from 'dotenv';
import { GetUsersController } from './controllers/get-users-controller';
import { MongoGetUsersRepository } from './repositories/get-users/mongo-get-users';
import { MongoClient } from './database/mongodb';
import { MongoGetUserByIdRepository } from './repositories/get-users/mongo-get-userById';
import { GetUserByIdController } from './controllers/get-user-by-id-controller';
import { MongoCreateUserRepository } from './repositories/create-user/mongo-create-user';
import { CreateUserController } from './controllers/create-user-controller';
import { MongoUpdateUserRepository } from './repositories/update-user/mongo-update-repository';
import { UpdateUserController } from './controllers/update-user-controller';
import { MongoDeleteUserRepository } from './repositories/delete-user/mongo-delete-user';
import { DeleteUserController } from './controllers/delete-user-controller';
import { SaveLog } from "./utils/save";

(async () => {
    const app = express();
    const PORT = 9000;
    
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(express.json());
    useDotEnv()
    
    await MongoClient.connect();

    app.listen(PORT, () => console.log(`> Servidor rodando... \n> Acesse localhost:${PORT}/home/`));
    
    app.get("/home", (req, res) => {
        const routes = {
            home: 'http://localhost:9000/home/',
            users:'http://localhost:9000/users/',
            post: 'http://localhost:9000/users/',
            patch: 'http://localhost:9000/users/id',
            delete: 'http://localhost:9000/users/id',
            userById: 'http://localhost:9000/users/id',
        }
    
        return res.send(routes)
    })
    
    app.get("/users", async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepository()
        const getUsersController = new GetUsersController(mongoGetUsersRepository)
        const response = await getUsersController.handle()
    
        res.status(response.statusCode).send(response.body)
    })

    app.get("/userbyid/:id", async (req, res) => {
        const mongoGetUserByIdRepository = new MongoGetUserByIdRepository()
        const getUserByIdController = new GetUserByIdController(mongoGetUserByIdRepository)
        const response = await getUserByIdController.handle({
            body: req.body,
            params: req.params,
        })

        console.log(response.body)
    
        res.status(response.statusCode).send(response.body)
    })

    app.post("/users", async (req, res) => {
        const mongoCreateUserRepository = new MongoCreateUserRepository();
        const createUserController = new CreateUserController(mongoCreateUserRepository);
        const { body, statusCode } = await createUserController.handle({
            body: req.body
        })

        SaveLog(req.body)

        return res.status(statusCode).send(body)
    })

    app.patch("/users/:id", async (req, res) => {
        const mongoUpdateUserRepository = new MongoUpdateUserRepository();
        const updateUserController = new UpdateUserController(mongoUpdateUserRepository);
        const { body, statusCode } = await updateUserController.handle({
            body: req.body,
            params: req.params
        })

        res.status(statusCode).send(body);
    })
    
    app.delete("/users/:id", async (req, res) => {
        const mongoDeleteUserRepository = new MongoDeleteUserRepository();
        const deleteUserController = new DeleteUserController(mongoDeleteUserRepository);
        const { body, statusCode } = await deleteUserController.handle({
            body: req.body,
            params: req.params
        })

        res.status(statusCode).send(body)
    })

})()