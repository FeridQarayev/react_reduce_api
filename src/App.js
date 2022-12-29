import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./style.css";

function App() {
  const [users, setUsers] = useState([]);
  const [inpVal, setInpVal] = useState("");
  useEffect(()=>{
    axios.get("https://randomuser.me/api/?results=100").then((res)=>setUsers(res.data.results));
  },[])
  return (
    <div className='body'>
      <div className='container'>
        <div className='container__up'>
          <h4>Live User Filter</h4>
          <p>Search by user name and/or location</p>
          <input type='text' placeholder='Search' onChange={(e)=>setInpVal(e.target.value)} />
        </div>
        <div className='list'>
          <ul>
            {
              users.filter((filltered)=>{
                let name = `${filltered?.name?.title} ${filltered?.name?.first} ${filltered?.name?.last}`;
                let City = `${filltered?.location?.city} ${filltered?.location?.state} ${filltered?.location?.country}`;
                if(inpVal=='') return filltered
                if (name.toLowerCase().includes(inpVal.toLowerCase())||City.toLowerCase().includes(inpVal.toLowerCase())) {
                  return filltered
                }
              })
              .map((user,index)=>{
                return (
                  <li key={index}>
                    <img src={user?.picture?.thumbnail} alt={user?.name} />
                    <div className='user__info'>
                      <h4>{user?.name?.title} {user?.name?.first} {user?.name?.last}</h4>
                      <span>{user.location.city} {user.location.state} {user.location.country}</span>
                    </div>
                  </li>
                  )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
