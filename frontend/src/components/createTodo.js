import { useState } from "react";
import { Link } from "react-router-dom";

import DateTimePicker from 'react-datetime-picker';
import axios from "axios";

import { serviceData } from '../constants/defaultValues';
import { NotificationManager } from "./common/react-notifications";

export function CreateTodo(props) {
    
    const [data, setData] = useState({ title: "", description: "",setdatetime:"" });
      const [value, setDate] = useState(new Date());

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function setStartDate(e){
        //console.log(e);
        setDate(e);
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        data.setdatetime = value;
        

       var token =  sessionStorage.getItem('userLoginToken')
       
        axios
            .post(serviceData+"api/todo",data,{
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                    "x-access-token": token
                  } })
            .then((res) => {                
                if(res.data.status){
                    
                    //console.log(res.message)
                    setData({ title: "", description: "",setdatetime:"" });
                    NotificationManager.success(
                        res.data.message,
                        "",
                        1000,
                        null,
                        null,
                        'filled'
                      );
                      props.history.push('/list');
                      
                    //console.log(res.data.message);
                }else{
                    NotificationManager.error(
                        res.data.message,
                        "",
                        1000,
                        null,
                        null,
                        'filled'
                      );
                }
                
            })
            .catch((err) => {
                console.log("Error couldn't create TODO");
                console.log(err.message);
                NotificationManager.error(
                    "Some Fields are Missing",
                    "",
                    1000,
                    null,
                    null,
                    'filled'
                  );
            });
    }

    return (
        <section className="container">
            <Link to="/list">
                <button type="button" className="button button-back">
                    back
                </button>
            </Link>

            <section className="update-contents">
                <form
                    onSubmit={handleSubmit}
                    className="form-container"
                    noValidate
                >
                    <label className="label" htmlFor="title">
                        Task Name
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        className="input" required
                    />
                    <label className="label" htmlFor="description">
                       Task Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        className="input" required
                    />

                    <label className="label" htmlFor="description">
                        Expire Date & Time
                    </label>
                    <div>
                    <DateTimePicker  minDate={new Date()}  onChange={(date) => setStartDate(date)} value={value} />
                    </div>

                    <>&nbsp;</>
                  

                    <button type="submit" className="button">
                        create todo
                    </button>
                </form>
            </section>
        </section>
    );
}
