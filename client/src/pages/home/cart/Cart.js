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

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
  };
  console.log(stripeToken);
  let address = "";
  let tokken = "ddd";
  let email = "";
  const dispatch = useDispatch();

  const verifyCartItems = () => {
    if(cart.total === 0){
      let txt = ""
      window.alert("Your cart is empty ! Redirecting to catalog...")
      window.location.replace("/product");
      return;
    }
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        alert("Payment Success ! Redirecting to your Orders...")
        sessionStorage.setItem('currentUser', '1');
        navigate("/Order", {state: {stripeData: stripeToken.id, products: cart}});
        address = res.data.source.address_line1
        tokken = stripeToken.id
        email = stripeToken.email
        sessionStorage.setItem('email', email)
        console.log("response email data : " + email)
        dispatch(removeProducts());
      } catch(err){
    
        console.log(err.response);
    }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

  return (
    <div>
      <Navbar />
      <div className='Wrapper'>
        <h1 className='Title'>Your cart</h1>
        <div className='Top'>
        <Link style={{color: "white", background: "white"}} to={`/Product`}>
          <button className='TopButton' style={{width: "350px", color: "white", height: "auto"}}>GO BACK TO CATALOG</button>
          </Link>
        </div>
        <div className='Bottom'>
          <div className='Info'>
            <hr className='Hr'/>

          {cart.products.map(product=>(<div className='Product'>
            <div className='ProductDetail'>
            <img className='Image' img src={product.image} />
              <div className='Details'>
                <span>
                  <b>Product:</b> {product.name}
                </span>
                <span>
                  <b>Quantity:</b> {product.quantity}
                </span>
              </div>
            </div>
            <div className='PriceDetail'>
              <div className='ProductAmountContainer'>
                <AddIcon />
                <div className='ProductAmount'>{product.quantity}</div>
                <RemoveIcon />
              </div>
              <div className='ProductPrice'>{parseInt(product.price)} EGP</div>
            </div>
          </div>
          ))}
            <hr className='Hr'/>
          </div>
          <div className='Summary'>
            <h1 className='SummaryTitle'>Order Details</h1>
            <div className='SummaryItem'>
              <span>Subtotal</span>
              <span>{parseInt(cart.total)} EGP</span>
            </div>
            <div className='SummaryItem'>
              <span>Estimated Shipping</span>
              <span>0 EGP</span>
            </div>
            <div className='SummaryItem'>
            </div>
            <div className='SummaryItem' type="total">
              <b>
              <span>Total</span>
              </b>
              <b>
              <span>{parseInt(cart.total)} EGP</span>
              </b>
              
            </div>
            <StripeCheckout 
          name= "Rabbit supermarket"
          image=""
          billingAddress
          shippingAddress
          description = {`Total amount to be paid: ${parseInt(cart.total)} EGP`}
          currency= "EGP"
          amount={parseInt(cart.total)*100}
          token={onToken}
          stripeKey={KEY}
          
          >
            <button className='TopButton' style={{width: "350px", color: "white", height: "auto"}}>CHECKOUT NOW</button>
            </StripeCheckout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
