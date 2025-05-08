import express,{Request,Response} from 'express';

const app = express();
const PORT = process.env.PORT||3001;

app.get('/',(req:Request,res:Response)=>{
    res.send("Hello from backend!");
})

app.listen(PORT,()=>{
    console.log(`THHE backend is runing at http://localhost:${PORT}/`);
})