import React from 'react'
import "./money.css"
function GaveGotMoney() {
    return (
        <div className="container">
            <div className="center-content mt-4">
                <div className="ggmoney-main">
                     
                    <div className="money-add-person">
                         
                      <button className="btn outline-btn1 right-btn"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add Person</button>
                    </div>
                    <div className="search-box">
                        <div>
                            <input type="text" className="form-control"/>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default GaveGotMoney
