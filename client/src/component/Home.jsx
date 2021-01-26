import React, { useEffect, useState } from 'react'
import "./home.css";
import { Button, Form, FormGroup, Input, ListGroup, ListGroupItem } from "reactstrap";
import Axios from 'axios';

function Home() {

    const [addItem, setItem] = useState({
        item: ""
    });
    const [allToDoItem, setAllToDoItem] = useState([{
        id: "1",
        item: "Went To Office"

    }]);

    //to load all item from data using useEffect
    useEffect(() => {
        Axios.get("http://localhost:5000/items")
            .then(d => {
                setAllToDoItem(d.data);
                console.log(d.data);
            })
    })


    //handle onChange method
    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem(prev => {
            return {
                [name]: value
            }
        })

    }
    const handleAddItem = (e) => {
        setAllToDoItem(prev => {
            return [
                ...prev,
                addItem
            ]
        })

        Axios.post("http://localhost:5000/add-item", addItem)
            .then(data => {
                console.log(data.data)
            })
        setItem({
            item: ""
        })
        e.preventDefault();
    }
    const handleDelete = (item_ID) => {
        Axios.delete("http://localhost:5000/item/" + item_ID)
            .then(d => {
                
            })
        
    }


    return (
        <div className="container all-content">
            <div className="row">
                <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
                    <div className="">
                        <Form autocomplete="off" >
                            <FormGroup>

                                <Input className="same-line" type="text" name="item" onChange={handleChange} value={addItem.item} id="addItem" placeholder="Task.." />
                                <Button onClick={handleAddItem} className="add-btn" color="info"><i class="fa fa-plus" aria-hidden="true"></i> Add</Button>
                            </FormGroup>

                        </Form>

                    </div>
                </div>
                <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12">
                    <ListGroup>
                        <ListGroupItem color="">

                            <Input type="text" name="searchInput" id="search" placeholder="Search.." />

                        </ListGroupItem>
                        {allToDoItem.map((data) => {
                            return <ListGroupItem color="">{data.item}<Button onClick={() => handleDelete(data._id)} style={{ float: "right" }} outline size="sm" color="danger"><i class="fa fa-times" aria-hidden="true"></i></Button> </ListGroupItem>

                        })}

                    </ListGroup>
                </div>

            </div>
        </div>
    )
}

export default Home
