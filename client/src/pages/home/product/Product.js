import React from "react";
//import { ShoppingBasketOutlined } from "@material-ui/icons";
import Navbar from "../../../components/navbar/Navbar";
import axios from "axios";
//import { Add, Remove } from "@material-ui/icons";
import { useState, useEffect } from "react";
//import { addProduct } from "../redux/cartRedux";
//import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "./product.css";

function Product(){
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
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
            <img id={product._id} key={product._id} src="https://digitalhub.fifa.com/transform/d526c8ad-d3c5-4bd8-93d5-dccc811a001a/FWC-2022-Ticketing-International-Fans"/>
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