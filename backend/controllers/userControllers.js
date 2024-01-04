import bcrypt from "bcrypt"
import userModel from '../models/userModel.js'



export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({})
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: "All users are",
            users
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "SomeThing went Wrong",
            error
        })
    }
}
export const registerUserController = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "All the fields are required",
            })
        }

        // existingUSer
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Email already Registered please Login"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)


        // save user
        const user = await new userModel({
            username, password: hashedPassword, email
        }).save()
        return res.status(201).send({
            success: true,
            message: "New User Created",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "SomeThing went Wrong",
            error
        })
    }
}
export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Both Fields are required"
            })
        }

        const existingUser = await userModel.findOne({ email })
        if (!existingUser) {
            return res.status(200).send({
                success: false,
                message: "Please register first"
            })
        }
        const isMatch = await bcrypt.compare(password, existingUser.password)
        if (!isMatch) {
            return res.status(200).send({
                message: "Incorrect  password try again"
            })
        }

        return res.status(200).send({
            success: true,
            message: "Login Successful",
            existingUser
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "SomeThing went Wrong",
            error
        })
    }
}