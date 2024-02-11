const express = require("express");
const app = express();
const cors = require("cors")
const pool = require ("./db");

//middleware
app.use(cors());
app.use (express.json())

//create a todo
app.post ("/todos", async (req,res) => {
    //await ,
    try{
        console.log(req.body);
        const{ description } = req.body
        const newToDo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
                                                                       // return back the data,should do everytime we CUD of CRUD 
        res.json(newToDo.rows[0])
    }catch(err){
        console.error (err.message);
    }
})


//get all todo
app.get ("/todos", async (req,res) => {
    
    try{
        const allTodos  = await pool.query("SELECT * FROM todo");// we dont need to RETURN as we are reding the data, (same as returning)
        res.json (allTodos.rows);

    }catch (err){
        console.error(err.message);
    }
}
)


// get a todo
app.get ("/todos/:id", async (req,res) => {
    //this allow url to be dymamic, check video 24min
     
    try{
        const {id} = req.params;
        const todo = await pool.query ("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json (todo .rows[0]);
    }catch (err){
        console.error(err.message);
    }
}
)


//update a todo
app.put ("/todos/:id", async (req,res) => {
    //await ,newToDo.rows[0], 
    try{
        const {id} = req.params;
        const{ description } = req.body;
        const newToDo = await pool.query("UPDATE todo SET description =  $1 WHERE todo_id = $2", 
        [description,id]);
                                                                       // return back the data,should do everytime we CUD of CRUD 
        res.json("TODO was updated")//newToDo.rows[0], 
    }catch(err){
        console.error (err.message);
    }
})

//delete a todo
app.delete("/todos/:id",async (req,res ) => {
    try{
        const {id} = req.params;
        const deleteToDo = await pool.query("DELETE  FROM todo WHERE todo_id = $1" ,[id]);
        res.json("Todo was deleted ");
    }catch(err){;

        console.error (err.message)
    }
})
app.listen (5000, () => {
    console.log ("server has started on port 5000");
});