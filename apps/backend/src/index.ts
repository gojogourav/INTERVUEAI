import express,{Request,Response} from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import  cookieParser from 'cookie-parser'

const app = express();


app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL||"http://localhost:3000",
    credentials:true
}));
app.use(express.json());

const PORT = process.env.PORT||3001;

app.use(cors());
app.use(express.json());

if(process.env.GEMINIAPI){
    const genAI = new GoogleGenerativeAI(process.env.GEMINIAPI);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); 
}


app.get('/',(req:Request,res:Response)=>{
    res.send("Hello from backend!");
})

app.listen(PORT,()=>{
    console.log(`THHE backend is runing at http://localhost:${PORT}/`);
})