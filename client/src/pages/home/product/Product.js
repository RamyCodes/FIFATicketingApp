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
import { useSelector } from "react-redux";

const KEY = "pk_test_51Kz0mQCAdufLrSrfWGUsQ9RrhPoNSZbzvVqtkZuUTNTAP5TqUcZELqguSxM1QXfWPTPuIIx6PBZ7JV86U7wPDPrn00qaqkrqay";

function Product(){
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [stripeToken, setStripeToken] = useState(null);
  const [categoryState, setcategoryState] = useState("Category 1");
  const [priceState, setpriceState] = useState(75);
  const [countState, setcountState] = useState();
  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch();
  const onToken = (token) => {
    setStripeToken(token);
  };

  const handleCart = (index, type)=>{
    if(cart.total > 0){
    return(message.error("You can only add 1 ticket for each order !"));
    }
    if(type === "Category 1" && product[index].availability.category1.count > 0 && product[index].availability.category1.pending < product[index].availability.category1.count){
      dispatch(
        addProduct({ product, id: product[index]._id, cat: 1, matchNumber: product[index].matchNumber, homeTeam: product[index].homeTeam, awayTeam: product[index].awayTeam, price: product[index].availability.category1.price, quantity, total:  product.forEach.price*quantity})
        )
        message.success("Added to cart successfully !");
    }
    else if(type === "Category 2" && product[index].availability.category2.count > 0 && product[index].availability.category2.pending < product[index].availability.category2.count){
      dispatch(
        addProduct({ product, id: product[index]._id, cat: 2, matchNumber: product[index].matchNumber, homeTeam: product[index].homeTeam, awayTeam: product[index].awayTeam, price: product[index].availability.category2.price, quantity, total:  product.forEach.price*quantity})
        )
        message.success("Added to cart successfully !");
    }
    else if(type === "Category 3" && product[index].availability.category3.count > 0 && product[index].availability.category3.pending < product[index].availability.category3.count){
      dispatch(
        addProduct({ product, id: product[index]._id, cat: 3, matchNumber: product[index].matchNumber, homeTeam: product[index].homeTeam, awayTeam: product[index].awayTeam, price: product[index].availability.category3.price, quantity, total:  product.forEach.price*quantity})
        )
        message.success("Added to cart successfully !");
    }
    else{
    return(message.error("Item is currently not available !"));
    }
  }



  const handleQuantity = (type, mNumber, category) =>{
    if(category === "Category 1" && product[mNumber].availability.category1.count > 0){
    if(type === "dec"){
      quantity > 1 && setQuantity(quantity - 1);
      }
      else if(quantity < product[mNumber].availability.category1.count && quantity < 2){
        setQuantity(quantity + 1);
      }
    }
    else if(category === "Category 2" && product[mNumber].availability.category2.count > 0){
      if(type === "dec"){
        quantity > 1 && setQuantity(quantity - 1);
        }
        else if(quantity < product[mNumber].availability.category2.count && quantity < 2){
          setQuantity(quantity + 1);
        }
    }
    else if(category === "Category 3" && product[mNumber].availability.category3.count > 0){
      if(type === "dec"){
        quantity > 1 && setQuantity(quantity - 1);
        }
        else if(quantity < product[mNumber].availability.category3.count && quantity < 2){
          setQuantity(quantity + 1);
        }
    }    
    else{
      return(message.error("Item is currently not available !"));
    }
  }

  useEffect(()=> {
    axios.get(`https://fifaback.onrender.com/api/matches`)
        .then( res => {
          console.log(res)
          setProduct(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },[])


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
            <br/><br/><h1> Match {product.matchNumber}</h1><br/>
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
                <option value="Category 1">Category 1: {product.availability.category1.count} tickets available, {product.availability.category1.pending} pending</option>
                <option value="Category 2">Category 2: {product.availability.category2.count} tickets available, {product.availability.category2.pending} pending</option>
                <option value="Category 3">Category 3: {product.availability.category3.count} tickets available, {product.availability.category3.pending} pending</option>
              </select>
            </h1>      
            <h1 className="Ti"> Price: {priceState*quantity} </h1>
            <br/>
          <div className="Am" key= {product.image +"Amount"}>
            <RemoveIcon id={product.matchNumber + "remove"} key={product.name + "-remove"} onClick={() => handleQuantity("dec", index, categoryState)} />
            <span className="A" key={product.name}>{quantity}</span>
            <AddIcon id={product.matchNumber + "add"} key={product.name+ "-add"} onClick={() => handleQuantity("inc", index, categoryState)} />
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