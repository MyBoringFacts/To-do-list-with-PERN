import React ,{Fragment, useState} from "react";


const InputTodo = () =>{

    const [description, setDescription] = useState("");
    //description is a state and set description is the only way to change the state


    const onSubmitFormm = async (e) => {
        e.preventDefault ();
        if (description && description.trim() !== "") {
        
            try{
                const body = {description};
                // const response = fetch("http://localhost:5000/todos",{
                //     method : "POST",
                //     headers: {
                //         "Content-Type": "application/json"},
                //     body: JSON.stringify(body)
                //     }
                // );
                // if (response.ok) {
                //     // Clear the input field
                //     setDescription("");
                    
                    
                //     window.location.reload();
                //   } else {
                //     console.error("Failed to add todo");
                //   }
                fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            .then(response => {
                if (response.ok) {
                    // Clear the input field
                    setDescription("");

                    // Reload the page to show the latest data
                    window.location.reload();
                } else {
                    console.error("Failed to add todo");
                }
            })
            .catch(err => console.error(err.message));
            }catch (err) {
                console.error(err.message);
            }
        }else{
            console.error("Description cannot be Null")
        }

    }
    return (
        <Fragment>
            <h1 className="text-center mt-5"><b>Pern ToDo List</b></h1>
            <form className="d-flex mt-5" onSubmit = {onSubmitFormm}> 
            {/* Comment: flex class moves the button form below to the side */}
                <input 
                    type = "text" 
                    className="form-control" 
                    value = {description}
                    onChange = {e => setDescription(e.target.value)}/>
                <button className =  "btn btn-success">Add</button>

                
            </form>
            
        </Fragment>
        
    )
    

}
export default InputTodo;