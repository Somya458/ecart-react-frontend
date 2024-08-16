import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../CSS/Welcome.css'
import Gridr from './Grid'
import Label from './Label'
// import axios from 'axios'
export class Welcome extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       img:true
    }
  }

  // getData=()=>
  // {
  //   axios.post("http://192.168.206.39/facebook/sign-up",
  //   {
  //     mobileNumber:"7028",
  //     firstName:"ganesh",
  //     lastName:"bagav",
  //     password:"1234",
  //     securityQuestion:"pet name ?",
  //     securityAnswe:"nick",
  //     date:"2001-02-01",
  //     gender:"male"

  //   })
  //   .then((resp)=>{
  //     console.log(resp.data)
  //   })
  //   .catch((err)=>{
  //     console.log(err.message)
  //   })
  // }
  render() {
    return (
      <div>
        <img src='../IMAGES/ecartback.jpg' alt="Not Found" id='BackImage'></img>
       
        <Link to="./Login" id='Login'>Log in</Link>
        <Link to='/Signup' id='Signup'>Signup</Link>
        <div id='EcartoTitle'>
            <img src='../IMAGES/EcartText.png' alt='Not Found' id="EcartText"></img>
            <p id="Line1">
            Welcome to E-Cart
            </p>
        </div>
        <div id="Footer">
          <div id="Footer1">
            <img src='../IMAGES/ecartblack.png' alt='' id="Zblack"></img>
            {/* <div id="Footer11">
              <img src='../IMAGES/Flag.png' alt='' id="FFlag"></img>
              <p id="Line5">India</p>
              <img src='../IMAGES/Downarr.png' alt='' id="Downarr1"></img>
            </div>
            <div id="Footer12">
              <img src='../IMAGES/web.png' alt='' id="web"></img>
              <p id="Line6">English</p>
              <img src='../IMAGES/Downarr.png' alt='' id="Downarr2"></img>
            </div> */}
          </div>
          <div id="Footer2">
            <div id="aboutecart">
              <p id="Head1">ABOUT E-Cart</p>
              </div>
            <div id="zomaverse">
              <p id="Head2">Contact Us</p>
              </div>
          </div>
          </div>
        {/* <button onClick={this.getData}>CLICK</button> */}
      </div>
    )
  }
}
export default Welcome
