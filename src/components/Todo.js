import React,{useState} from 'react';
import { List,ListItem,ListItemText,Modal,Button} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UpdateIcon from '@material-ui/icons/Update';
import db from "../firebase";
import {makeStyles} from '@material-ui/core/styles';
import { classExpression } from '@babel/types';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props){
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    const [input ,setInput] = useState('');
    const handleOpen = () => {
        setOpen(true);
      };
    const UpdateTodo =() =>{
        db.collection('todos').doc(props.todo.id).set({
            todo:input,
        },{merge:true})
        setInput('');
        setOpen(false)
    }  
    
      
    return(
        <>
        <div>
        <Modal
        open={open}
        onClose={e =>setOpen(false)}
        >
            <div className={classes.paper}>
            <input placeholder={props.todo.todo} value={input} onChange={event =>{setInput(event.target.value)}} />
            <Button variant="contained" color="secondary"onClick={UpdateTodo}>Update Todo</Button>
            </div>
        </Modal>

            <List>
                <ListItem>
                    <ListItemText primary={props.todo.todo} secondary="Dummy Deadline" />
                    <DeleteForeverIcon onClick={event =>{db.collection('todos').doc(props.todo.id).delete()}}></DeleteForeverIcon>
                    <UpdateIcon onClick={e =>setOpen(true)}></UpdateIcon>
                </ListItem>
            </List>          
        </div>
        </>
    )
}

export default Todo;