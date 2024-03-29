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

### Product /products

| Method | Endpoint |      Description       |
| :----: | :------: | :--------------------: |
|  GET   |    /     |    get all products    |
|  GET   |   /:id   | get a specific product |
|  POST  |    /     |    add new product     |

## GET / :
response: [
  {
  "_id": "65faf26b8dec99b4cd38a768",
  "name": "Red T-shirt",
  "description": "Classic red cotton t-shirt",
  "price": 272,
  "colors": [
  "red"
  ],
  "sizes": [
  "S",
  "M",
  "L"
  ],
    "image": "",
    "__v": 0
  },
  ........
  ]

 ##   GET /:id pass product id in params only 
{"_id": "65faf26b8dec99b4cd38a768",
  "name": "Red T-shirt",
  "description": "Classic red cotton t-shirt",
  "price": 272,
  "colors": [
    "red"
  ],
  "sizes": [
    "S",
    "M",
    "L"
  ],
  "image": "",
  "__v": 0
}
##  POST / pass all the inforation i the model below
  return the product created
  
### User /users

| Method | Endpoint  |     Description     |
| :----: | :-------: | :-----------------: |
|  GET   |     /     |    get all users    |
|  GET   |   /:id    | get a specific user |
|  POST  | /register |   create new user   |
|  POST  |  /login   |  authenticate user  |

### Cart /cart

| Method | Endpoint  |     Description     |
| :----: | :-------: | :--------------------: | ------------------- |
|  GET   |   /:id    | get All userCart Items | <-- this is user id |
|  POST  | /add-item | add item to user cart  |
| DELETE |   /:id    | delete item from cart  | <-- cartItem id     |
|  PUT   |   /:id    |   update Item amount   | <-- cartItem id     |

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

### cart

    productId: ObjectId,
    userId: ObjectId,
    amount: Number,
    color: String,
    size: String,
