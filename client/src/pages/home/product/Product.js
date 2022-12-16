import "./product.css";
import Navbar from "../../../components/navbar/Navbar";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { message } from "antd";
import  AddIcon from '@mui/icons-material/Add';
import  RemoveIcon from '@mui/icons-material/Remove';
import { addProduct } from "../../../redux/cartRedux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const KEY = "pk_test_51Kz0mQCAdufLrSrfWGUsQ9RrhPoNSZbzvVqtkZuUTNTAP5TqUcZELqguSxM1QXfWPTPuIIx6PBZ7JV86U7wPDPrn00qaqkrqay";

function Product(){
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [stripeToken, setStripeToken] = useState(null);
  const [categoryState, setcategoryState] = useState("Category 1");
  const [priceState, setpriceState] = useState(75);
  const [countState, setcountState] = useState();
  const dispatch = useDispatch();
  const onToken = (token) => {
    setStripeToken(token);
  };
  console.log(stripeToken);
  let currentProduct = "";
  let currentPendingTickets = "";


  const handleCart = (index, type)=>{
    if(type === "Category 1"){
      dispatch(
        addProduct({ product, id: product[index]._id, cat: "cat 1", matchNumber: product[index].matchNumber, homeTeam: product[index].homeTeam, awayTeam: product[index].awayTeam, price: product[index].availability.category1.price*quantity, quantity, total:  product.forEach.price*quantity})
        )
        message.success("Added to cart successfully !");
    }
    else if(type === "Category 2"){
      dispatch(
        addProduct({ product, id: product[index]._id, cat: "cat 2", matchNumber: product[index].matchNumber, homeTeam: product[index].homeTeam, awayTeam: product[index].awayTeam, price: product[index].availability.category2.price*quantity, quantity, total:  product.forEach.price*quantity})
        )
        message.success("Added to cart successfully !");
    }
    else if(type === "Category 3"){
      dispatch(
        addProduct({ product, id: product[index]._id, cat: "cat 3", matchNumber: product[index].matchNumber, homeTeam: product[index].homeTeam, awayTeam: product[index].awayTeam, price: product[index].availability.category3.price*quantity, quantity, total:  product.forEach.price*quantity})
        )
        message.success("Added to cart successfully !");
    }
    else{
    return(message.error("Item is currently not available !"));
    }
  }



  const handleQuantity = (type, mNumber) =>{
    if(product[mNumber].availability.category1.count === 0)
    return(message.error("Item is currently not available !"));
    if(type === "dec"){
    quantity > 1 && setQuantity(quantity - 1);
    }
    else if(quantity < product[mNumber].availability.category1.count && quantity < 2){
      setQuantity(quantity + 1);
    }
    else{
      message.error("You can't get more tickets!")
    }
  }

  useEffect(()=> {
    axios.get(`http://localhost:5000/api/matches`)
        .then( res => {
          console.log(res)
          setProduct(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },[])

    useEffect(() => {
      const makeRequest = async () => {
        try {
          const res = await axios.post("http://localhost:5000/api/checkout/payment", {
            tokenId: stripeToken.id,
            amount: 100*100,
          });
          message.success(`Payment Success ! Ticket holder email: ${stripeToken.email}`, 3)
          let email = stripeToken.email
          sessionStorage.setItem('email', email)
          console.log("response email data : " + email)
          createReservation();
        } catch(err){
          message.error('Payment Failed ! Please try again !', 3)
          console.log(err.response);
      }
      };
      stripeToken && makeRequest();
    }, [stripeToken]);
  
    const createReservation = async () => {
      let showDate = new Date()
      let displayDate = showDate.getDate() +'/'+ (showDate.getMonth() + 1) +'/'+ showDate.getFullYear()
      try {
        const res = await axios.post("http://localhost:5000/api/reservations", {
          ticketID: "testTicket",
          DatePurchased: displayDate,
          userEmail: stripeToken.email
        });
      }
      catch (err){
        console.log(err.response);
    }
    }

    const reduceStock = (id, pending) =>{
      try {
        const res = axios.put(`http://localhost:5000/api/matches/${id}`, {
          NumberOfPendingTickets: pending + 1,
        });
      } catch (err){
        console.log(err.response);
    }
    }

    const getPrice = (mNumber, category) =>{
      if(category === "Category 1")
      return product[mNumber].availability.category1.price
      else if(category === "Category 2")
      return product[mNumber].availability.category2.price
      else if(category === "Category 3")
      return product[mNumber].availability.category3.price
    }

    const getCount = (mNumber, category) =>{
      if(category === "Category 1")
      return product[mNumber].availability.category1.count
      else if(category === "Category 2")
      return product[mNumber].availability.category2.count
      else if(category === "Category 3")
      return product[mNumber].availability.category3.count
    }

  return(
    <div className="main">
    <Navbar />          
    <div className="wrap">
      <div className="in">
       {         
      <ul>
        {
          product.map((product, index) => 
            <div>
            <br/>
            <br/>
            <hr size="2" width="90%" color="white"/>
            <br/><br/><h1> Match {index +1}</h1><br/>
        <div id={product._id + index} key={product._id + index} style={{display: "flex", justifyContent: "space-between"}}> 
          <div>
            <h1 className="Ti"> Game: {product.homeTeam} VS {product.awayTeam} </h1>
            <h1 className="Ti"> Round Number: {product.roundNumber} </h1>
            <h1 className="Ti"> DateUtc: {product.dateUtc} </h1>
            <h1 className="Ti"> Location: {product.location} </h1>
            <h1 className="Ti">
            Selected Category: {categoryState}<br/>
            <select id={index + 23} style={{height: "50px", fontSize: "22px", fontWeight: "bold"}}
                value={categoryState}
                onChange={(e) => {
                  const selectedCategory = e.target.value;
                  setcategoryState(selectedCategory);
                  setpriceState(getPrice(index, selectedCategory))
                  setcountState(getCount(index, selectedCategory))
                }}
              >
                <option value="Category 1">Category 1: {product.availability.category1.count} tickets left</option>
                <option value="Category 2">Category 2: {product.availability.category2.count} tickets left</option>
                <option value="Category 3">Category 3: {product.availability.category3.count} tickets left</option>
              </select>
            </h1>      
            <h1 className="Ti"> Price: {priceState} </h1>
            <br/>
          <div className="Am" key= {product.image +"Amount"}>
            <RemoveIcon id={product.matchNumber + "remove"} key={product.name + "-remove"} onClick={() => handleQuantity("dec", index)} />
            <span className="A" key={product.name}>{quantity}</span>
            <AddIcon id={product.matchNumber + "add"} key={product.name+ "-add"} onClick={() => handleQuantity("inc", index)} />
          </div>
          <br/>
          </div>
            <div className="Im">
            <img id={product._id} key={product._id} onClick={() => handleCart(index, categoryState)} src="https://digitalhub.fifa.com/transform/d526c8ad-d3c5-4bd8-93d5-dccc811a001a/FWC-2022-Ticketing-International-Fans"/>
            </div>
        </div>
      </div>)
         
        }
      </ul>
              
          }
        
      </div>
    </div>
  </div>

      
      
  )
}

    
export default Product;