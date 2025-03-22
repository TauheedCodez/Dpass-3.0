import React from 'react'
import { useState } from "react";
import "./Display.css"

function Display({ contract, account }) {
    const [data, setData] = useState("");
    const getdata = async () => {
        let dataArray;
        dataArray = await contract.display(account);
        // console.log(dataArray);

        if (dataArray.length === 0) {
            alert("No saved password available, fisrt save the password");
            return;
        }
        setData(dataArray);
    }

    return (
        <>
            <button className="button" onClick={getdata}>Get Data</button>
            <div className="data-list">
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div key={index} className="data-item">
                            <h3>Entry {index + 1}</h3>
                            <p><strong>Title:</strong> {item.title}</p>
                            <p><strong>Password:</strong> {item.privateKey}</p>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p className="no-data-message">Click above button to view your saved Passwords</p>
                )}
            </div>
        </>
    );
}

export default Display