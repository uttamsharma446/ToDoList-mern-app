import React, { useEffect, useState } from 'react'
import "./home.css";
import { Button, Form, FormGroup, Input, ListGroup, ListGroupItem } from "reactstrap";
import Axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const ID = cookies.get('ID');
function Home() {

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


    return (
        <div className="container all-content">
          <h3 className="home-title">Todo List </h3>
            {!ID&&<div>
                <h1>Please Login .......</h1>
                <a style={{textDecoration:"none"}} className="btn btn-primary" href="/login">login</a>
            </div>}
            {ID && <div className="row">
                <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
                    <div className="">
                      
                           

                                <form onSubmit={handleAddItem}>
                                    <Input className="same-line" type="text" name="item" onChange={handleChange} value={addItem.item} id="addItem" placeholder="Task.." />
                                    <Button type="submit" className="add-btn" color="info"><i className="fa fa-plus" aria-hidden="true"></i> Add</Button>

                                </form>
                         

                      

                    </div>
                </div>
                <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12">
                    <ListGroup>

                        {allToDoItem ? allToDoItem.map((data,index) => {
                            return <ListGroupItem key={index} color="">{data}<Button style={{ float: "right" }} outline size="sm" color="danger"><i className="fa fa-times" aria-hidden="true"></i></Button> </ListGroupItem>

                        }) : <h1>No Items Added</h1>}

                    </ListGroup>
                </div>

            </div>}
        </div>
    )
}

export default Home
