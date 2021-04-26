import React, { useState, useEffect } from 'react'
import { Button, Input, ListGroup, ListGroupItem } from "reactstrap";
import "./todo.css"
import Axios from 'axios';
import Cookies from 'universal-cookie';
import axios from 'axios';
import {url} from "../URL";
const cookies = new Cookies();
const ID = cookies.get('ID');
function Todo() {
    const [count, setCount] = useState(0);
    const [isEditClicked, setIsEditClicked] = useState(false)
    const [listItemStyle, setListItemStyle] = useState({});
    const [addItem, setItem] = useState({
        item: "",
        index: 0
    });
    const [allToDoItem, setAllToDoItem] = useState([]);

    //to load all item from data using useEffect
    useEffect(() => {
        if (ID) {
            Axios.get(`${url}/get-item/${ID}`)
                .then(result => {
                    setAllToDoItem(result.data)
                })
        }

    })


    //handle onChange method
    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem(prev=>{
           return{

            ...prev,
            item:value

           }
        });

    }
    const handleAddItem = (e) => {
        if (ID) {
            if (isEditClicked) {
                
             Axios.put(`${url}/todo/edit-item/${ID}`,addItem)
                    .then(result => {
                       
                        setIsEditClicked(false)
                        setItem({
                            item: "",
                            index: 0
                        })

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            if (!isEditClicked) {
                Axios.put(`${url}/addItem/${ID}`, addItem)
                    .then(d => {
                        console.log(d.data);
                    })
                setItem({
                    item: ""
                })
            }
        }
        e.preventDefault(false);
    }

    const handleDelete = (index) => {
        Axios.delete(`${url}/del-item/${ID}/${index}`)
            .then(result => {

            })
            .catch(err => {
                alert(err)
            })


    }
    // when user is completed the task

    const handleCompleteCheck = (index) => {

        var chkState = document.querySelectorAll("#complete-item-check");
        if (chkState[index].checked === true) {
            var item = document.getElementById("item" + index);
            item.style.textDecoration = "line-through"
            item.style.textDecoration = "line-through"
            item.style.textDdecorationColor = "#bbbbbb"
            item.style.color = "#bbbbbb"

        }
        if (chkState[index].checked === false) {
            var item = document.getElementById("item" + index);
            item.style.textDecoration = ""
            item.style.textDecoration = ""
            item.style.textDdecorationColor = ""
            item.style.color = ""

        }




    }
    //handle clearitems
    const handleClearItems = () => {
        axios.delete(`${url}/todo/clear-items/${ID}`)
            .then(result => {
                alert(result.data);
            })
            .catch(err => {
                console.log(err)
            })
    }
   
    return (

        <div className='container'>



            {
                ID && <div className="main">

                    <div className="list-box">
                        <p className="todo-title">THINGS TO DO</p>
                        <form id="add-item-form" onSubmit={handleAddItem}>
                            <div className="form-container">
                                <Input className="input-box form-control" type="text" name="item" onChange={handleChange} value={addItem.item} placeholder="Add New.." required />
                                {/* <Button type="submit" className="add-btn btn" color="info"><i className="fa fa-plus" aria-hidden="true"></i></Button>*/}
                                <button type="submit" className="add-item-btn outline-btn1  btn">{isEditClicked ? "Edit" : "Add"}</button>
                            </div>
                        </form>


                        <ListGroup>

                            {allToDoItem.length > 0 ? allToDoItem.map((data, index) => {
                                return <ListGroupItem id={"items"} className={"items" + index} style={listItemStyle} key={index} color=""><input onClick={() => { handleCompleteCheck(index) }} id="complete-item-check" type="checkbox" />
                                    <label className="itemName" id={"item" + index}>{data}</label>
                                    <small onClick={() => { handleDelete(index) }} className="todo-item-delete"><i class="fa fa-times-circle-o" aria-hidden="true"></i></small>
                                    {/* this is for edit item */}
                                   <small
                                     onClick={() => { 
                                    setItem({
                                        index:index,
                                        item:allToDoItem[index]
                                    })
                                    setIsEditClicked(true);
                                    }} 
                                     className="todo-item-edit"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></small>
                                     </ListGroupItem>

                            }) : <ListGroupItem style={{ color: 'red', textAlign: "center" }}>Empty</ListGroupItem>}
                        </ListGroup>
                        {allToDoItem.length > 1 && <div className="text-center mt-3"><button className="btn btn-sm outline-btn1" onClick={handleClearItems}>Clear Items</button></div>}
                    </div>

                </div>}





        </div>)


}

export default Todo
