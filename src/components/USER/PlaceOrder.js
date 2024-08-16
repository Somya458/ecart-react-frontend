import React, { Component } from 'react';
import axios from 'axios';
import '../CSS/Placeorder.css';
import History from '../History';

export default class PlaceOrder extends Component {
    constructor(props) {
        super(props);

        // Initialize the state with props data
        const obj = this.props.location.state.orddata;
        const userPhoneNumber = this.props.location.state.phonenum;

        // Calculate totalamount
        obj.totalamount = obj.amount.reduce((total, value) => total + parseInt(value, 10), 0);

        // Initialize quantities with 1 for each item
        const initialQuantities = obj.fooditemid.map(() => 1);

        this.state = {
            obj: {
                ...obj,
                quantity: initialQuantities
            },
            userPhoneNumber,
            totalamount: obj.totalamount
        };
    }

    billCheck = () => {
        const { obj } = this.state;

        // Recalculate totalamount based on updated quantities
        obj.totalamount = obj.amount.reduce((total, value, index) => {
            const quantity = parseInt(obj.quantity[index], 10) || 1;
            return total + (parseInt(value, 10) * quantity);
        }, 0);

        this.setState({ totalamount: obj.totalamount, obj });
    }

    increment = (index) => {
        this.setState(prevState => {
            const newQuantity = [...prevState.obj.quantity];
            newQuantity[index] = (parseInt(newQuantity[index], 10) || 0) + 1;
            return {
                obj: {
                    ...prevState.obj,
                    quantity: newQuantity
                }
            };
        }, this.billCheck);
    }

    decrement = (index) => {
        this.setState(prevState => {
            const newQuantity = [...prevState.obj.quantity];
            const currentQuantity = parseInt(newQuantity[index], 10) || 1;
            if (currentQuantity > 1) {
                newQuantity[index] = currentQuantity - 1;
            }
            return {
                obj: {
                    ...prevState.obj,
                    quantity: newQuantity
                }
            };
        }, this.billCheck);
    }

    addMore = () => {
        History.push({
            pathname: "/Addmore",
            state: {
                orddata: this.state.obj,
                phonenum: this.state.userPhoneNumber
            }
        });
    }

    order = (e) => {
        e.preventDefault();

        const { obj, userPhoneNumber } = this.state;

        obj.totalamount = Number(obj.totalamount);
        obj.fooditemid = obj.fooditemid.map(String);
        obj.amount = obj.amount.map(String);

        const deliveryAddress = document.getElementById('deliveryAddress').value;
        if (deliveryAddress) {
            obj.deliveryaddress = deliveryAddress;
        } else {
            console.log("Fill Delivery Address");
            return;
        }

        axios.post("http://localhost:8006/orders/place-order", obj)
            .then((resp) => {
                console.log(resp.data);
                History.push({
                    pathname: "Orders",
                    state: {
                        phonenum: userPhoneNumber
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    back = () => {
        History.push({
            pathname: "/User",
            state: {
                phonenum: this.state.userPhoneNumber
            }
        });
    }

    render() {
        const { obj, totalamount } = this.state;

        if (obj.fooditemid.length === 0) {
            return (
                <div className='PlaceOrder'>
                    Redirect to UserLogin Page with Props userPhoneNumber
                </div>
            );
        }

        return (
            <>
                <div id="Adlogback"></div>
                <div id="Admintag">
                    <img src='../IMAGES/Userpic.png' alt='Not found'></img>
                    <p>USER</p>
                </div>
                <img src="../IMAGES/Home.png" alt="Not found" className='Home' onClick={this.back}></img>
                <div className='PlaceOrder'>
                    <h1 id="arhead">Place Order : {obj.restaurantname}</h1>
                    <form className='Orderform'>
                        {obj.fooditemid.map((value, index) => (
                            <div className='FoodItem' key={index}>
                                <p className='Orddishname'>Dish : {obj.foodname[index]}</p>
                                <p className='Orddishprice'>Price : {obj.amount[index]}</p>
                                <label htmlFor={'quantity' + index} className='ordqntl'>Quantity : </label>
                                <button type="button" className="ordi" onClick={() => this.increment(index)}>+</button>
                                <input
                                    type='number'
                                    min={0}
                                    placeholder='1'
                                    id={'quantity' + index}
                                    value={obj.quantity[index]}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        this.setState(prevState => {
                                            const newQuantity = [...prevState.obj.quantity];
                                            newQuantity[index] = value;
                                            return {
                                                obj: {
                                                    ...prevState.obj,
                                                    quantity: newQuantity
                                                }
                                            };
                                        }, this.billCheck);
                                    }}
                                    className='ordqnt'
                                />
                                <button type="button" className="ordd" onClick={() => this.decrement(index)}>-</button>
                            </div>
                        ))}
                    </form>
                    <h3 className='Totalamt'>Total Amount : {totalamount}</h3>
                    <input type="text" placeholder='Enter Delivery Address' id='deliveryAddress'></input>
                    <input type="button" onClick={this.addMore} value="Add More" id="addmore"></input>
                    <input type="submit" onClick={this.order} value="Order" id="ordsub"></input>
                </div>
            </>
        );
    }
}
