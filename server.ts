import express from "express";
import path from 'path'
import {Client} from 'pg'
import {env} from './env'

const app = express()
app.use(express.json());

export const client = new Client({
    database: env.DB_NAME,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
})
client.connect()

app.get('/',(req,res)=>{
    res.sendFile(path.resolve('public/html', 'home.html'))
});

app.get('/list',async (req,res)=>{
    try {
        console.log("getting to do list");
        
        //other code
        let result = await client.query (
            'select * from lists where is_archived = false order by id'
        );
        let lists = result.rows
        res.json({lists})
    } catch(err){
        console.log(err)
        res.json({err:"internal server error"})
    }
});

// ASKASK
// understand why this api needs to match with the form action api
app.post('/api/list',async (req,res)=> {
    try{
        //other code
        // console.log('aa', req)
        // console.log('bb', req.query)
        // console.log('by', req.body)
        let {name} = req.query
        // console.log('gg', {name})
        let result = await client.query(/* sql */
            `insert into
            lists (name, is_archived)
            values ($1, $2) 
            returning id
            `, 
            [name, false]
        );
        // console.log('xcx', {result})
        const id = result.rows[0].id
        res.status(201)
        res.json({id, name})
    }catch(err){
        console.log(err)
        res.json({err:"internal server error"})
    }
});

app.delete('/api/list/:id', async(req, res) => {
    try {
        const id = +req.params.id
        if (!id) {
            res.status(400)
            res.json({error: "Invalid role id"})
            return
        }
        // todo change to archive
        const result = await client.query(
            'delete from lists where id = $1', [id]
        )
        if (result.rowCount == 0) {
            res.status(404)
            res.json({error: "list not found"})
        }
        res.json({})
    } catch (err) {
        console.log(err)
        res.json({err:"internal server error"})
    }
})

app.patch('/api/list/:id/:name', async(req, res) => {
    try {
        console.log('nnn', {req})
        console.log('vvv', req.body)
        console.log('qqq', req.query)
        const id = +req.params.id
        if (!id) {
            res.status(400)
            res.json({error: 'Invalid role id'})
            return
        }
        const name = req.params.name
        console.log('nanana', name)
        const result = await client.query(
            'update lists set name = $1 where id = $2', [name, id]
        )

        console.log('rr', {result})
        if (result.rowCount == 0) {
            res.status(404)
            res.json({error: "List not found! Update failed!"})
        } else {
            //ASKASK
            // what does this line do, now line after response works
            res.json({success: true, id, name})
        }
    } catch (err) {
        res.json({err: 'internal server error'})
    }
})

app.use(express.static('public'))

// handle 404 error
app.use((req,res) => {
    res.status(404);
    //STUDY, just copied
    if (req.headers.accept == "application/json") {
        res.json({
          error: `Route not found, method: ${req.method}, url: ${req.url}`,
        });
      } else {
        let file = path.resolve("public/html/404.html");
        res.sendFile(file);
      }

})

const PORT = 8220;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`)
})