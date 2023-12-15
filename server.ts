import express from "express";
import path from 'path'
import {Client} from 'pg'
import {env} from './env'

const app = express()

export const client = new Client({
    database: env.DB_NAME,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
})
client.connect()

app.get('/',(req,res)=>{
    res.sendFile(path.resolve('public/html', 'home.html'))
});
app.get('/todo',async (req,res)=>{
    try {
        console.log("getting to do list");
        
        //other code
        let result = await client.query (
            'select * from to_do_list'
        );
        let lists = result.rows
        res.json({lists})
    } catch(err){
        console.log(err)
        res.json({err:"internal server error"})
    }
});
app.post('/todo',async (req,res)=>{
    try{
        
        //other code
        let {name} = req.query
        let result = await client.query(/* sql */
            `insert into
            to_do_list (name, is_archived)
            values ($1, $2) 
            returning id
            `, 
            [name, false]
        );
        const id = result.rows[0].id
        res.status(201)

        res.json({id, name})
    }catch(err){
        console.log(err)
        res.json({err:"internal server error"})
    }

});

app.use(express.static('public'))

// handle 404 error
app.use((req,res) => {
    res.status(404);

})



const PORT = 8200;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`)
})