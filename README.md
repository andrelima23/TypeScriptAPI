# User API - TypeScript

## Tecnologias utilizadas

* Node.js
* TypeScript
* Express
* MongoDB

## Como usar
* Clone este repositório
* Na raiz do projeto, instale as dependências do Node.

via npm
```
npm install
```

via yarn
```
yarn 
```

Execute o projeto.

via npm:
```
npm watch run
```

via yarn:
```
yarn dev
```

## Rotas

* GET /home - Retorna todas as rotas do projeto.
* GET /users - Retorna todos os usuários salvos no banco de dados.
* GET /users/:id - Retorna um usuário específico por id
* POST /users - Cria um novo usuário
* PATCH /users/:id - Atualiza um usuário
* DELETE /users/:id - Deleta um usuário

## Entidade
```
user {
    name: string,
    lastName: string,
    email: string,
    password: string
}
```

### Observação
* Crie um arquivo .env com as seguintes variáveis e preencha de acordo com o seu cluster no MongoDB
```
MONGODB_URL= xxxxxxxxxxxxxxxxxx
MONGODB_USERNAME= xxxxxxxxxxxxx
MONGODB_PASSWORD= xxxxxxxxxxxxx
```

