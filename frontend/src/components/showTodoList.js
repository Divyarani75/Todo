import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UpdateTodo } from "./updateTodo";
import { serviceData } from '../constants/defaultValues';
import { NotificationManager } from "./common/react-notifications";
import  Helpers  from "../helpers/helper";

function TodoCard({ data, handleEdit, handleDelete,handleRestore,props }) {
    const { _id, title, description,setdatetime,status } = data;

    const token =  sessionStorage.getItem('userLoginToken')
       

    const axiosconfig = {
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            "x-access-token": token
          } }
  
    function statusChange(_id){

       // console.log(_id,"putUpdateStatus");

       axios
            .put(`${serviceData}api/todo/${_id}`, {status:2},axiosconfig)
            .then((res) => {
                if(res.data.status){
                    //setData({ title: "", description: "" });
                    //console.log(res.data.message);
                    NotificationManager.success(
                        res.data.message,
                        "",
                        1000,
                        null,
                        null,
                        'filled'
                      );

                      window.location.reload(false);
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
                //console.log("Failed to update todo");
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
        <li key={_id}>
            <div className="title-description">
                <h3>{title}</h3>
                <p>{description}</p>

                <p>&nbsp;</p>
                <p>Expire on:</p>
                <p style={{"fontSize":"12px"}}>{Helpers.formatDate(setdatetime)}</p>

                { ((status == 0 || new Date().getTime() > new Date(setdatetime).getTime() ) && status!=2)  ? <p style={{"color":"red"}}> Expired </p> : status == 2 ? <p style={{"color":"Green"}}>Completed</p> : <a href="true" onClick={()=>{statusChange(_id) } } style={{"fontSize":"12px","color":"white"}}> Click To Complete</a>
                 }
                  <p>&nbsp;</p>
            </div>
            
            <div className="button-container">
            { (status == 1 && props.match.params.id!="trash" )  ?
                <><button className="button" name={_id} onClick={handleEdit}>
                    edit
                </button>
                <button className="button" name={_id} onClick={handleDelete}>
                    delete
                </button> </>: props.match.params.id=="trash" ? 
                <button className="button" name={_id} onClick={handleRestore}>
                    Restore
                </button> : <></>
            }
            </div> 
        </li>
    );
}

export function ShowTodoList(props) {
    const [todo, setTodo] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");
    const [fetchdata, setfetchdata] = useState({});
    const [update, setUpdate] = useState(false);
    const [eparam,seteparam] = useState('');

    const token =  sessionStorage.getItem('userLoginToken')
       

    const axiosconfig = {
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            "x-access-token": token
          } }
    

    useEffect(       

        
    
        function () {

            

            if(props.match.params.id !=undefined && props.match.params.id=="expire"){
                seteparam(props.match.params.id)
            axios
                .get(serviceData+"api/todo/expirelist",axiosconfig)
                .then((res) => {
                    console.log(res.data);
                    setTodo(res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
            }else if(props.match.params.id !=undefined && props.match.params.id=="trash"){
                
                seteparam(props.match.params.id)
            axios
                .get(serviceData+"api/todo/trashlist",axiosconfig)
                .then((res) => {
                    //console.log(res.data);
                    setTodo(res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
            }else{
                seteparam("")
                axios
                .get(serviceData+"api/todo",axiosconfig)
                .then((res) => {
                    //console.log(res.data);
                    setTodo(res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
            }
        },
        [update,props]
    );

    function handleEdit(data) {
        setfetchdata(data);
    //     setId(e.target.name);
    setId(data._id)
        setOpen(true);
    }

    function handleUpdate() {
        //console.log("update:", update, !update);
        setUpdate(!update);
    }

    function handleRestore(data){
        //console.log(data);
        let id = data._id;
        axios.post(`${serviceData}api/todo/restoretodo`,data,axiosconfig).then((res) => {
            //console.log(res.data);
            if(res.data.status){

                NotificationManager.success(
                    res.data.message,
                    "",
                    1000,
                    null,
                    null,
                    'filled'
                  );
                setTodo((data) => {
                    return data.filter((todo) => todo._id !== id);
                });

                if(data.status==0){
                    props.history.push('/list/expire')
                }else{
                    props.history.push('/list')
                }
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

    

    function handleDelete(data) {
        let id = data._id;
        axios.post(`${serviceData}api/todo/deletetodo`,data,axiosconfig).then((res) => {
            //console.log(res.data);
            if(res.data.status){

                NotificationManager.success(
                    res.data.message,
                    "",
                    1000,
                    null,
                    null,
                    'filled'
                  );
                setTodo((data) => {
                    return data.filter((todo) => todo._id !== id);
                });
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

    function handleClose() {
        setId("");
        setOpen(false);
    }

    return (
        <section className="container-fluid">

    <div className="row">
        <div className="row">
            
             {eparam!="" ? <div className="col-md-3">
            <Link to="/list" className="button-new" >
                <button className="button"> Back</button>               
            </Link>
            </div> : <></>}

          

            <div className="col-md-3">
            <Link to="/list/expire" className="button-new" >
                <button className="button"> Expire List</button>               
            </Link>
            </div>
           <div className="col-md-3">
            <Link to="/list/trash" className="button-new">
                <button className="button"> Trash List</button>               
            </Link>
            </div>


            <div className="col-md-3">
            <Link to="/create-todo" className="button-new" >
                <button className="button"> + ADD TODO</button>               
            </Link>
            </div>

            </div>
            </div>     
            <section className="contents">
                <h1>TODO</h1>
           
                <ul className="list-container">
                {todo && todo.length>0 ?
                    todo.map((data,idx) => (
                        <TodoCard key={idx}
                            data={data}
                            handleEdit={()=>{ handleEdit(data) }}
                            handleDelete={()=>{ handleDelete(data) }}
                            handleRestore ={()=>{ handleRestore(data) }}
                            props = {props}
                        />
                    ))

: <li> No List Found</li> }
                </ul>
                
            </section>
            {open ? (
                <section className="update-container">
                    <div className="update-contents">
                        <p onClick={handleClose} className="close">
                            &times;
                        </p>

                        <UpdateTodo
                            _id={id}
                            fetchdata={fetchdata}
                            handleClose={handleClose}
                            handleUpdate={handleUpdate}
                        />
                    </div>
                </section>
            ) : (
                ""
            )}
        </section>
    );
}
