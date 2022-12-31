import {React, Component} from 'react'
import Navbar from "../../../components/navbar/Navbar";
import axios from 'axios';
import "./stats.css";
import Chart from 'react-apexcharts'
import { useState, useEffect } from "react";


function Stats() {
const [product, setProduct] = useState([]);
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
    let matches = []
    let count = []
    product.map((product) => {
        if(product.availability.category1.count < 20 || product.availability.category2.count < 20 || product.availability.category3.count < 20){
        matches.push("Match " + product.matchNumber)
        // 60 because the total of the 3 categories is 20x3 = 60
        count.push(60 - (product.availability.category1.count + product.availability.category2.count + product.availability.category3.count))
        }
    })
    console.log(matches)
    console.log(count)

    const options = {
        chart: {
        id: 'apexchart-example',
        foreColor: '#fff'
        },
        xaxis: {
        categories: matches
        }
    }
    const series = [{
        name: 'series-1',
        data: count
    }]

      return (
        <div className='Root'> 
        <Navbar />
        <div className='Main'>
        <h1 style={{color: "white", marginLeft: "80px"}}> Most selling matches </h1>
        <Chart style={{color: "white"}} options={options} series={series} type="bar" width={500} height={320} />
        </div>
        </div>
      )
}

  export default Stats;