import React from 'react'
import Navbar from "../../../components/navbar/Navbar";
import  AddIcon from '@mui/icons-material/Add';
import  RemoveIcon from '@mui/icons-material/Remove';
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect, useState} from "react";
import StripeCheckout from "react-stripe-checkout";
import {useNavigate} from 'react-router-dom';
import { removeProducts } from "../../../redux/cartRedux";
import { useDispatch } from "react-redux";
import { createContext } from "react";
import axios from 'axios';
import "./cart.css";
import { message } from "antd";
import ReCAPTCHA from "react-google-recaptcha";

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
  };
  console.log(stripeToken);
  const [verified, setVerified] = useState(false);
  function onChange(value) {
    console.log("Captcha value:", value);
    setVerified(true)
  }

  let address = "";
  let tokken = "ddd";
  let email = "";
  const dispatch = useDispatch();

  const verifyCartItems = () => {
    if(cart.total === 0){
      window.alert("Your cart is empty ! Redirecting to catalog...")
      window.location.replace("/product");
      return;
    }
  }


  useEffect(() => {
    const makeRequest = async () => {
      try {
        reduceStock();
        message.success(`Payment Success ! Ticket holder email: ${stripeToken.email}`, 3)
        dispatch(removeProducts());
      } catch(err){
        message.error("Payment Failed, Please try again !")
        console.log(err.response);
    }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

  const reduceStock = () =>{
    try {
      for (let i = 0; i < cart.products.length; i++){
        // post sale on kafka (and from kafka update the master list)
        const res = axios.post("https://reservations-microservice.onrender.com/api/v1/reservation", {
          email: stripeToken.email,
          matchNumber: cart.products[i].matchNumber,
          tickets: {category: cart.products[i]?.cat, quantity: cart.products[i]?.quantity, price: cart.products[i]?.price},
          card: {number: "4242424242424242", expirationMonth: 12, expirationYear: 2024, cvc: "123"}
        });
         console.log(res)
        // post sale in reservations db
        const res2 = axios.post("https://fifaback.onrender.com/api/reservations", {
          email: stripeToken.email,
          matchNumber: cart.products[i].matchNumber,
          tickets: {category: cart.products[i]?.cat, quantity: cart.products[i]?.quantity, price: cart.products[i]?.price},
          card: {number: "4242424242424242", expirationMonth: 12, expirationYear: 2024, cvc: "123"}
          })
      }
    } catch (err){
      console.log(err.response);
  }
  }

  return (
    <div>
      <Navbar />
      <div className='Wrapper'>
        <h1 className='Title'>Your cart</h1>
        <div className='Top'>
        <Link to={`/Product`}>
          <button className='Button' style={{width: "250px", color: "black", height: "auto"}}>GO BACK TO CATALOG</button>
          </Link>
        </div>
        <div className='Bottom'>
          <div className='Info'>
            <hr className='Hr'/>

          {cart.products.map(product=>(<div className='Product'>
            <div className='ProductDetail'>
            <img className='Image' img src={"https://digitalhub.fifa.com/transform/d526c8ad-d3c5-4bd8-93d5-dccc811a001a/FWC-2022-Ticketing-International-Fans"} />
              <div className='Details'>
                <span>
                  <b>Match Number:</b> {product.matchNumber}
                </span>
                <span>
                <b>Game:</b> {product.homeTeam} VS {product.awayTeam}
                </span>
                <span>
                  <b>Quantity:</b> {product.quantity}
                </span>
                <span>
                  <b>Category:</b> {product.cat}
                </span>
              </div>
            </div>
            <div className='PriceDetail'>
              <div className='ProductAmountContainer'>
                <AddIcon />
                <div className='ProductAmount'>{product.quantity}</div>
                <RemoveIcon />
              </div>
              <div className='ProductPrice'>{parseInt(product.price)} USD</div>
            </div>
          </div>
          ))}
            <hr className='Hr'/>
          </div>
          <div className='Summary'>
            <h1 className='SummaryTitle'>Order Details</h1>
            <div className='SummaryItem'>
                <span> Subtotal</span>
              </div>
            {cart.products.map(product=>  (
              <div className='SummaryItem'>
                <span> {product.homeTeam} VS {product.awayTeam} (X{product.quantity}) {product.price} USD</span>
              </div>
            ))}
            <div className='SummaryItem'>
              <span>Estimated Shipping</span>
              <span>0 USD</span>
            </div>
            <hr/>
            <div className='SummaryItem'>
              <b>
              <span>Total</span>
              </b>
              <b>
              <span>{parseInt(cart.total*cart.products[0]?.quantity)} USD</span>
              </b>
            </div>
            <ReCAPTCHA style={{marginLeft: "30px", marginBottom: "20px"}}
    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    onChange={onChange}
  />
            <StripeCheckout  disabled={!verified}
          name= "FIFA - World Cup 2022™"
          image=""
          billingAddress
          shippingAddress
          description = {`Total amount to be paid: ${parseInt(cart.total*cart.products[0]?.quantity)} USD`}
          currency= "USD"
          amount={parseInt(cart.total)*cart.products[0]?.quantity * 100}
          token={onToken}
          stripeKey={KEY}
          
          >
              <button className='TopButton' disabled={!verified} onClick={() => {reduceStock()}} style={{width: "350px", height: "auto", marginLeft: "20px"}}>CHECKOUT NOW</button>
            </StripeCheckout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
