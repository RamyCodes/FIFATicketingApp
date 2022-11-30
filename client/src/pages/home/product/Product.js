import "./product.css";
import Navbar from "../../../components/navbar/Navbar";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { message } from "antd";


const KEY = "pk_test_51Kz0mQCAdufLrSrfWGUsQ9RrhPoNSZbzvVqtkZuUTNTAP5TqUcZELqguSxM1QXfWPTPuIIx6PBZ7JV86U7wPDPrn00qaqkrqay";

function Product(){
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };
  console.log(stripeToken);
//  const dispatch = useDispatch();


// const handleCart = (index)=>{

//   if(product[index].stock < 1)
//   return(alert("Item is currently not available !"));
//   dispatch(
//   addProduct({ product, id: product[index]._id, stock: product[index].stock, name: product[index].name, image: product[index].image, price: product[index].price*quantity, quantity, total:  product.forEach.price*quantity})
//   )
//   alert("Added to cart successfully !");
// }



// const handleQuantity = (type, search) =>{
//   if(product[0].stock === 0)
//   return(alert("Item is currently not available !"));
//   if(type === "dec"){
//    quantity > 1 && setQuantity(quantity - 1);
//   }
//   else if(quantity < product[0].stock){
//     setQuantity(quantity + 1);
//   }
//   else{
//     alert(`Only ${product[0].stock} of this product left !`)
//   }
// }

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
          let tokken = stripeToken.id
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

  return(
    <div className="main">
    <Navbar />          
    <div className="wrapper">
      <div className="info">
       {         
      <ul>
        {
          product.map((product, index) => 
            <div>
            <br/>
            <br/>
            <hr size="2" width="90%" color="white"/>
            <br/><br/><h1> Match {index +1}</h1><br/>
        <div style={{display: "flex", justifyContent: "space-between"}}> 
          <div>
            <h1 className="Title">   MatchNumber: {product.MatchNumber} </h1>
            <h1 className="Title">  RoundNumber: {product.RoundNumber} </h1>
            <h1 className="Title">  DateUtc: {product.DateUtc} </h1>
            <h1 className="Title"> Location: {product.Location} </h1>
            <h1 className="Title"> StadiumCapacity: {product.StadiumCapacity} </h1>
            <h1 className="Title"> HomeTeam: {product.HomeTeam} </h1>
            <h1 className="Title"> AwayTeam: {product.AwayTeam} </h1>
            <h1 className="Title"> Group: {product.Group} </h1>
            {/* <h1 className="Title"> HomeTeamScore: {product.HomeTeamScore} </h1>
            <h1 className="Title"> AwayTeamScore: {product.AwayTeamScore} </h1> */}
          </div>
            <div className="Image">
            <StripeCheckout 
          name= "Tickets - FIFA World Cup Qatar 2022™"
          image=""
          billingAddress
          shippingAddress
          description = {`Total amount to be paid: 100 EGP`}
          currency= "EGP"
          amount={100*100}
          token={onToken}
          stripeKey={KEY}
          >
            <img id={product._id} key={product._id} src="https://digitalhub.fifa.com/transform/d526c8ad-d3c5-4bd8-93d5-dccc811a001a/FWC-2022-Ticketing-International-Fans"/>
            </StripeCheckout>
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