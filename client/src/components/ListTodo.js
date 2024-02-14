import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";

const ListTodo = () => {
  // State to hold the todos
  const [todos, setTodos] = useState([]);

  // Function to delete a todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      // Update state to remove the deleted todo
      setTodos(todos.filter((todo) => todo.todo_id !== id));
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Function to fetch todos from the server
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    getTodos();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td><EditTodo todo={todo} / ></td>
              <td>
                {/* Button to trigger delete function */}
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodo;
