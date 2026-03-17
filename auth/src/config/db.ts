import mongoose from 'mongoose'

const ConnectDB= async()=>{
    try{
        await mongoose.connection.on('connected',()=>{
            console.log("connected to database")
        })
        await mongoose.connection.on('error',()=>{
            console.log("Error connecting to database")
        })
        await mongoose.connect(process.env.DATABASE_URL as string)
    } catch (error) {
        console.error("Error connecting to database:", error)
        process.exit(1)
    }
}
export default ConnectDB