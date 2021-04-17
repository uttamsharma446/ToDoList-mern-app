import React,{useState,useEffect} from 'react'
import { Button, Input, ListGroup, ListGroupItem } from "reactstrap";

import Axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const ID = cookies.get('ID');
function Todo() {
   const [count, setCount] = useState(0)
    const [listItemStyle, setListItemStyle] = useState({});
    const [addItem, setItem] = useState({
        item: ""
    });
    const [allToDoItem, setAllToDoItem] = useState([]);

    //to load all item from data using useEffect
    useEffect(() => {
        if (ID) {
            Axios.get("https://todoappbyus.herokuapp.com/get-item/" + ID)
                .then(result => {
                    setAllToDoItem(result.data)
                })
        }

    })


    //handle onChange method
    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({
            item: value
        });

    }
    const handleAddItem = (e) => {
        if (ID) {
            Axios.put("https://todoappbyus.herokuapp.com/addItem/" + ID, addItem)
                .then(d => {
                    console.log(d.data);
                })
            setItem({
                item: ""
            })
        }
        e.preventDefault(false);
    }

    const handleDelete = (index) => {
        Axios.delete(`https://todoappbyus.herokuapp.com/${ID}/${index}`)
        .then(result=>{
         
        })
        .catch(err=>{
            alert(err)
        })


    }
    // when user is completed the task

    const handleCompleteCheck = (index) => {
       
        var chkState=document.querySelectorAll("#complete-item-check");
        if(chkState[index].checked===true)
       {
        var item = document.getElementById("item"+index);
        item.style.textDecoration="line-through"
        item.style.textDecoration= "line-through"
        item.style.textDdecorationColor="#bbbbbb"
        item.style.color= "#bbbbbb"
      
        }
        if(chkState[index].checked===false)
        {
         var item = document.getElementById("item"+index);
         item.style.textDecoration=""
         item.style.textDecoration= ""
         item.style.textDdecorationColor=""
         item.style.color= ""
       
         }

        
           
       
    }
    return (

        <>



            {
                ID && <div className="main">

                    <div className="list-box">
                        <p className="todo-title">THINGS TO DO</p>
                        <form id="add-item-form" onSubmit={handleAddItem}>
                            <Input className="input-box" type="text" name="item" onChange={handleChange} value={addItem.item} placeholder="Add New.." />
                            <Button type="submit" className="add-btn" color="info"><i className="fa fa-plus" aria-hidden="true"></i></Button>

                        </form>


                        <ListGroup>

                            {allToDoItem.length>0 ? allToDoItem.map((data, index) => {
                                return <ListGroupItem id={"items"} className={"items" + index} style={listItemStyle} key={index} color=""><input onClick={() => { handleCompleteCheck(index) }} id="complete-item-check" type="checkbox" /><label id={"item"+index}>{data}</label><small onClick={()=>{handleDelete(index)}} style={{float:"right",color:"red",cursor:"pointer"}}><i class="fa fa-trash-o" aria-hidden="true"></i></small></ListGroupItem>

                            }) : <ListGroupItem style={{color:'red',textAlign:"center"}}>Empty</ListGroupItem>}
                        </ListGroup>
                    </div>

                </div>}





        </>)

    
}

export default Todo
