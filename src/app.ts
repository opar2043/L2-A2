import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());



app.get('/', ()=>{
    console.log('Server is running');
    return 'Server is running';
})

export default app;