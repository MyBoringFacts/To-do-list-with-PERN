import React , {Fragment, useState} from "react";

const EditTodo = ({todo}) => {
    const [description, setDescription] = useState(todo.description);

    //edit the updated description
    const updateDescription = async (e) =>{
        e.preventDefault();
        
        
        if (description && description.trim() !== "") {
            
            try{
                const body = {
                    description
                }
                
                fetch(`http://localhost:5000/todos/${todo.todo_id}`,{
                    method: "PUT",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify(body)
            })
            .then(response => {
                if (response.ok) {


                    // Reload the page to show the latest data
                    window.location.reload();
                } else {
                    console.error("Failed to update todo");
                }
            })
            .catch(err => console.error(err.message));
            }catch (err) {
                console.error(err.message);
            }
        }else{
            console.error("Description cannot be Null")
        }}




    return <Fragment>
        <button type="button"
            class="btn btn-primary" 
            data-toggle="modal"
            data-target={`#id${todo.todo_id}`}
            
            >
            Edit
        </button>

        
        <div class="modal" id={`id${todo.todo_id}`} onClick={()=> setDescription(todo.description)}>
        <div class="modal-dialog">
            <div class="modal-content">

            i
            <div class="modal-header">
                <h4 class="modal-title">Edit your todo</h4>
                <button type="button" class="close" data-dismiss="modal" onClick={()=> setDescription(todo.description)}>&times;</button>
            </div>

           
            <div class="modal-body">
                <input type= "text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}></input>
            </div>

           
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={e => updateDescription(e) }>Edit</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

            </div>
        </div>
        </div>

    </Fragment>;

};

export default EditTodo;