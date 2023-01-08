import React from 'react'
import Navbar from "../../../components/navbar/Navbar";
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect, useState} from "react";
import axios from 'axios';
import "./tickets.css";
import { message } from "antd";
import SearchIcon from '@mui/icons-material/Search';


const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");

  const handleClick = () =>{
    setSearch(search);
    searchReq();
  }

  const searchReq = () => {
    if(search === "")
    return message.error("Please enter an email !")
    axios.get(`http://localhost:5000/api/reservations?email=${search}`)
    .then( res => {
      if(res.data.length === 0)
      return message.error("This email does not exist !")
      setTickets(res.data)
      console.log(res.data)
    })
    .catch(err => {
      message.error("You are doing that too much. Please try again in a moment.")
      console.log(err)
    })
  }
  // Making the search button work with keyboard Enter key
  try{
  document.getElementById("txtSearch").onkeydown= e => (e.key=="Enter") ? document.getElementById("buttonTxt").click() : 1
  }
  catch(error){
    console.log(error)
  }
  return (
    <div>
      <Navbar />
      <div className='Wrapper'>
        <h1 className='Title'>Your Tickets</h1>
        <div className='Top'>
        <Link to={`/Product`}>
          <button className='Button' style={{width: "250px", color: "black", height: "auto"}}>GO BACK TO CATALOG</button>
        </Link>
        <div className='SearchContainer'>
        <input id="txtSearch" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by email" style={{height: 40, width: 350}} />
            <button onClick={handleClick} type = "button"  id="buttonTxt" style={{backgroundColor: "#020f2a", marginLeft: "10px"}}>
            <SearchIcon style={{ color: "white", fontSize: 35}} />
            </button>
        </div>
        </div>
        <div className='Bottom'>
          <div className='Info'>
            <hr className='Hr'/>

          {tickets.map(product=>(<div className='Product'>
            <div className='ProductDetail'>
            <img className='Image' img src={"https://digitalhub.fifa.com/transform/d526c8ad-d3c5-4bd8-93d5-dccc811a001a/FWC-2022-Ticketing-International-Fans"} />
              <div className='Details'>
              <span>
                  <b>Ticket ID:</b> {product._id}
                </span>
                <span>
                  <b>Match Number:</b> {product.matchNumber}
                </span>
                <span>
                  <b>Category:</b> {product.tickets.category}
                </span>
                <span>
                  <b>Quantity:</b> {product.tickets.quantity}
                </span>
                <span>
                  <b>Price:</b> {product.tickets.price}
                </span>
              </div>
            </div>
          </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
