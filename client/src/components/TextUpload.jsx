import React from 'react'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import "./TextUpload.css"

function TextUpload({account, provider, contract}) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [text, setText] = useState(null);

    const onSubmit = async (data) => {
        // console.log(data);
        // setText(text);
        // console.log(title);
        // console.log(privateKey);
        
        if(`${data.title}` && `${data.privateKey}`) {
            try {
                contract.add(account, `${data.title}`, `${data.privateKey}`);
                alert("Successfully Saved");
            } catch (error) {
                console.log(error);
            }
        }
        else {
            alert("Unable to Save");
        }
    }
    return (
        <div className="text-upload">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-label">Enter the Title: </div>
                <input 
                    className="input-field" 
                    disabled={!account} 
                    type="text" 
                    placeholder="Enter your title" 
                    {...register("title", {required: {value: true, message: "This field is required"}})} 
                />
                {errors.title && <div className="error-message">{errors.title.message}</div>}
                <div className="input-label">Enter your Password: </div>
                <input 
                    className="input-field" 
                    disabled={!account} 
                    type="text" 
                    placeholder="Enter your password" 
                    {...register("privateKey", {required: {value: true, message: "This field is required"}})} 
                />
                {errors.privateKey && <div className="error-message">{errors.privateKey.message}</div>}
    
                <button className="submit-button" type="submit">Save</button>
            </form>
        </div>
    );
}

export default TextUpload