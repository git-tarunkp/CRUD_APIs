import React,{useEffect,useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Users() {

        const [users,setUsers]=useState([])

        useEffect(()=>{
            axios.get('http://crud-ap-api.vercel.app')
            .then(result => setUsers(result.data))
            .catch(err=>console.log(err))
        },[])

        const handleDelete=(id) =>{
            axios.delete("http://crud-ap-api.vercel.app/"+id)
            .then(res => {console.log(res)
                window.location.reload()
            })
            .catch(err=>console.log(err))
        }

    return (
        <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">

            <Link to="/Create" className="btn btn-success btn-sm bg-primary">ADD+</Link>

            <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
                {
                    users.map((user)=>{
                        return <tr>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td><Link to={`/update/${user._id} `}className="btn btn-success btn-sm bg-primary">UPDATE</Link> <button className="btn btn-danger bg-secondary" onClick={(e)=>handleDelete(user._id)}>DELETE </button></td>
                        </tr>
                    })
                }
          </tbody>
        </table>

            </div>
        </div>
    )
}

export default Users;
