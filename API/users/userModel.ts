import { Schema, model } from 'mongoose'

enum Role {
    ADMIN = "admin",
    USER = "user"
}

const userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, default: Role.ADMIN }
})



const User = model('users', userSchema)

export default User