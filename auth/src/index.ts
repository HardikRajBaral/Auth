import dotenv from "dotenv";
dotenv.config();
import cors from 'cors'
import express from 'express'
import authRoutes from './routes/authRoutes'
import connectDB from './config/db'

const app = express()
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true}
));


app.use("/apis/auth",authRoutes)


const server= async()=>{
    await connectDB()
    app.listen(process.env.PORT||5000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
}

server()

