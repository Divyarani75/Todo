import { useState } from "react";
import axios from "axios";
import { serviceData } from '../constants/defaultValues';
import { NotificationManager } from "./common/react-notifications";

import DateTimePicker from 'react-datetime-picker';

export function UpdateTodo({ _id,fetchdata, handleClose, handleUpdate }) {

   // console.log(fetchdata,"fetchdatafetchdatafetchdatafetchdata")
    
    const [data, setData] = useState({ title: fetchdata.title, description: fetchdata.description,setdatetime: fetchdata.setdatetime });
    const [value, setDate] = useState(new Date(fetchdata.setdatetime));
    const token =  sessionStorage.getItem('userLoginToken')
    const axiosconfig = {
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            "x-access-token": token
          } }

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function setStartDate(e){
        //console.log(e);
        setDate(e);
    }

    function handleSubmit(e) {
        e.preventDefault();

        //console.log({ _id }, { data });

        data.setdatetime = value;

        // if(new Date().getTime() > new Date(data.setdatetime).getTime()){
        //     data.status = 0;
        // }

        axios
            .put(`${serviceData}api/todo/${_id}`, data,axiosconfig)
            .then((res) => {
                if(res.data.status){
                    setData({ title: "", description: "",setdatetime:"" });
                    //console.log(res.data.message);
                    NotificationManager.success(
                        res.data.message,
                        "",
                        1000,
                        null,
                        null,
                        'filled'
                      );
                }else{
                    NotificationManager.success(
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
                console.log("Failed to update todo");
                console.log(err.message);
                NotificationManager.error(
                    "Something Went Wrong",
                    "",
                    1000,
                    null,
                    null,
                    'filled'
                  );
            });
    }

    return (
        <form
            className="form-container"
            onSubmit={(e) => {
                handleSubmit(e);
                handleUpdate();
                handleClose();
            }}
        >
            <label htmlFor="title" className="label">
                Title
            </label>
            <input
                type="text"
                name="title"
                className="input"
                value = {data.title}
                onChange={handleChange} required
            />
            <label htmlFor="description" className="label">
                Description
            </label>
            <input
                type="text"
                name="description"
                value = {data.description}
                className="input"
                onChange={handleChange} required
            />

            
            <label className="label" htmlFor="description">
                        Expire Date & Time
                    </label>
                    <div>
                    <DateTimePicker  minDate={new Date()}  onChange={(date) => setStartDate(date)} value={value} />
                    </div>

                    <>&nbsp;</>

            <button type="submit" className="button">
                Submit
            </button>
        </form>
    );
}
