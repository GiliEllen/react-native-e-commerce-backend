# e-commerce backend

## Requirements

For development, you will only need Node.js and a node global package, and npm

## Install

    $ git clone
    $ cd to the folder
    $ npm install

## Create a .env file in the root directory and add the following environment variables

    PORT
    MONGOS_CONNECTION_LINK

## Running the project

    $ npm start

## End points

### Product

| Method | Endpoint |      Description       |
| :----: | :------: | :--------------------: |
|  GET   |    /     |    get all products    |
|  GET   |   /:id   | get a specific product |
|  POST  |    /     |    add new product     |

### User

| Method | Endpoint  |     Description     |
| :----: | :-------: | :-----------------: |
|  GET   |     /     |    get all users    |
|  GET   |   /:id    | get a specific user |
|  POST  | /register |   create new user   |
|  POST  |  /login   |  authenticate user  |

---

## Collections

### User

    name: String,
    email: String,
    password: String

### Product

    name:String,
    description: String,
    price: Number,
    colors: Array,
    sizes: Array,
    image: String
