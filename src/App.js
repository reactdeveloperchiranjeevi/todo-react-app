import React,{useState,useEffect} from 'react';
import "./App.css";
import Todo from "./components/Todo.js"
import { Button,FormControl,InputLabel,Input } from '@material-ui/core';
import db from './firebase.js';
import firebase from 'firebase';

function App(){
  const[input ,setInput] = useState('');
  const[todos,setTodos]  = useState([]);

  const todo =(event) =>{
    event.preventDefault()
    db.collection('todos').add({
      todo:input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput("");
  }

  useEffect(()=>{
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot =>(
      setTodos(snapshot.docs.map(doc =>({id : doc.id, todo : doc.data().todo})))
    ))
  },[])
  return(
    <div className="App">
      <h1> To-Do list App</h1>
      <form>
        <FormControl>
        <InputLabel htmlFor="my-input">Enter To-Do</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" type="text" placeholder="Enter ToDo" value={input} onChange={event =>{setInput(event.target.value)}}/>
        </FormControl>
        <Button type="submit" onClick={todo} disabled={!input} variant="contained" color="primary">Add ToDo</Button>
      </form>
      <ul>
        {
          todos.map(todo =>(
            <Todo todo={todo} />
          ))
        }
      </ul>
    </div>
  )
}

export default App;