import React, { useEffect, useState } from 'react'
import "./home.css";
import { Button, Form, FormGroup, Input, ListGroup, ListGroupItem } from "reactstrap";
import Axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const ID = cookies.get('ID');
function Home() {
    const [count,setCount]=useState(0)
    const [listItemStyle,setListItemStyle]=useState({});
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

    const handleDelete = (id) => {


    }
// when user is completed the task

const handleCompleteCheck=(index)=>{
    var item=document.getElementById("items");
    console.log(item);
   if(count===0)
   {
    setListItemStyle({
        textDecoration:"line-through",
        textDdecorationColor: "#bbbbbb",
        color:"#bbbbbb"
    })
    setCount(1)
   }
   if(count===1)
   {
    setListItemStyle({})
    setCount(0);
   }
}

    return (
        <>

           
            {
                !ID && <div>
                    <h1>Please Login .......</h1>
                    <a style={{ textDecoration: "none" }} className="btn btn-primary" href="/login">login</a>
                </div>
            }
            {
                ID && <div className="main">
                   
                    <div className="list-box">
                       <p className="todo-title">THINGS TO DO</p>
                        <form id="add-item-form"  onSubmit={handleAddItem}>
                            <Input className="input-box" type="text" name="item" onChange={handleChange} value={addItem.item}  placeholder="Add New.." />
                            <Button type="submit" className="add-btn" color="info"><i className="fa fa-plus" aria-hidden="true"></i></Button>

                        </form>


                        <ListGroup>

                            {allToDoItem ? allToDoItem.map((data, index) => {
                                return  <ListGroupItem id={"items"} className={"items"+index} style={listItemStyle} key={index} color=""><input onClick={()=>{handleCompleteCheck(index)}} id="complete-item-check" type="checkbox"/>{data}</ListGroupItem>

                            }) : <h1>No Items Added</h1>}

                        </ListGroup>
                    </div>

                </div>}





        </>)
}

export default Home
