import { User } from '../models/user';
import { HttpRequest, HttpResponse } from '../protocols/http-protocols';
import { ICreateUser, ICreateUserParams, ICreateUserRepository } from '../repositories/create-user/icreate-user';
import { badRequest, ok, serverError } from "../helpers/helpers";
import validator from "validator";

export class CreateUserController implements ICreateUser {

    _createUserRepository: ICreateUserRepository;

    constructor(createUserRepository: ICreateUserRepository) {
        this._createUserRepository = createUserRepository;
    }

    async handle(httpRequest: HttpRequest<ICreateUserParams>): Promise<HttpResponse<User | string>> {
        try {
            const requiredFields = ["name", "lastName", "email", "password"];

            for (const field of requiredFields) {
                if (!httpRequest?.body?.[field as keyof ICreateUserParams]?.length) {
                return badRequest(`Field ${field} is required`);
                }
            }

            const emailIsValid = validator.isEmail(httpRequest.body!.email);

            if (!emailIsValid) {
                return badRequest("E-mail is invalid");
            }
            
            const user = await this._createUserRepository.createUser(httpRequest.body!);

            if(!user) {
                return badRequest("Usuário não foi criado")
            }
            console.log(user)

            return ok<User>(user);

        } catch (error) {
            return serverError();
        }
    }

}