import express from "express";
import path from 'path'

const app = express()

app.get('/', async function (req: Request, res: Response) {
    res.sendFile(path.resolve('public/html', 'home.html'))
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