import React from 'react';
import Router from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import { History } from 'history';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from "jQuery";
import cookie from 'react-cookies';
import { render } from 'react-dom';
import * as V from 'victory';
var GraphsPage = React.createClass({

  getInitialState: function(){
    return {
      loginID: '',
      password: '',
      isSubmitted: false
    };
  },

  mixins: [History],

  render: function(){
  
    return(
        <div className="login-page ng-scope ui-view"> 
          <div className="row"> 
            <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4"> 
              <img src={require("../../common/images/flat-avatar.png")} className="user-avatar" /> 
              <h1> {"Investing in ETF's is a relatively safe option, as it exposes you to a wide range of different stocks."} </h1> 
              <h1> {"One of the most popular ETF's is something you may have heard of, the S&P 500."} </h1> 
              <h1> {"Over the last ten years, the average return has been around 7.8% yearly."} </h1>
              <h1> {"With the power of compound interest, your investment could double very quickly"} </h1> 
              <h1> {"Let's take a look at how we can leverage this ETF to improve your financial future."} </h1> 
              <h1> <small> {"Total savings: $" +  cookie.load('balance')} </small></h1>
              <h1> <small> {"Income over the last 6 months: $" +  cookie.load('income')} </small></h1>
              <h1> <small> {"Expenditures over the last 6 months:  $" +  cookie.load('expenditures')} </small></h1>
              <h1> {"Fill how much extra you'd like to put into your investment yearly so I can show you how much money you stand to gain!"} </h1> 
              <form role="form" onSubmit={this.handleNext} className="ng-pristine ng-valid"> 
                <div className="form-content"> 
                  <div className="form-group"> 
                    <input type="text" onChange={ this.setYearly } className="form-control input-underline input-lg" placeholder="Additionaly yearly deposits" /> 
                  </div> 
                </div> 
                <button type="submit" className="btn btn-white btn-outline btn-lg btn-rounded">So how will this affect me?</button> 
              </form> 
              <h1>  </h1>
              <form role="form" onSubmit={this.handleLogin} className="ng-pristine ng-valid"> 
                <button type="submit" className="btn btn-white btn-outline btn-lg btn-rounded">Start Over</button> 
              </form> 
            </div> 
          </div> 
        </div>
      
    );
},

setPre10: function(e) {
console.log("pog");
var money = parseInt(cookie.load('balance'))-parseInt(cookie.load('expenditures'));

console.log(money);
  for (var i = 0; i < 10; i++) {
        money = money + parseInt(cookie.load('yearly'));
    } 
    console.log(money);
    cookie.save('pre10', money, { path: '/' });
  },

  setPost10: function(e) {
console.log("pog");
var money = parseInt(cookie.load('balance'))-parseInt(cookie.load('expenditures'));

console.log(money);
  for (var i = 0; i < 10; i++) {
        money = money + parseInt(cookie.load('yearly'));
        money = money*1.078;
    } 
    console.log(money);
    cookie.save('post10', money, { path: '/' });
  },

setPre20: function(e) {
console.log("pog");
var money = parseInt(cookie.load('balance'))-parseInt(cookie.load('expenditures'));

console.log(money);
  for (var i = 0; i < 20; i++) {
        money = money + parseInt(cookie.load('yearly'));
    } 
    console.log(money);
    cookie.save('pre20', money, { path: '/' });
  },

  setPost20: function(e) {
console.log("pog");
var money = parseInt(cookie.load('balance'))-parseInt(cookie.load('expenditures'));

console.log(money);
  for (var i = 0; i < 20; i++) {
        money = money + parseInt(cookie.load('yearly'));
        money = money*1.078;
    } 
    console.log(money);
    cookie.save('post20', money, { path: '/' });
  },

  setPre30: function(e) {
console.log("pog");
var money = parseInt(cookie.load('balance'))-parseInt(cookie.load('expenditures'));

console.log(money);
  for (var i = 0; i < 30; i++) {
        money = money + parseInt(cookie.load('yearly'));
    } 
    console.log(money);
    cookie.save('pre30', money, { path: '/' });
  },

  setPost30: function(e) {
console.log("pog");
var money = parseInt(cookie.load('balance'))-parseInt(cookie.load('expenditures'));

console.log(money);
  for (var i = 0; i < 30; i++) {
        money = money + parseInt(cookie.load('yearly'));
        money = money*1.078;
    } 
    console.log(money);
    cookie.save('post30', money, { path: '/' });
  },

  setYearly: function(e) {
    cookie.save('yearly', e.target.value, { path: '/' });
    this.setState({
      loginID: e.target.value,
      loginError: ''
    });

  },

 handleNext: function(e){
this.setPost10();
this.setPre10();
this.setPost20();
this.setPre20();
this.setPost30();
this.setPre30();
    console.log(cookie.load('pre10'));
    console.log(cookie.load('post10'));
    console.log(cookie.load('yearly'));
 console.log(cookie.load('yield'));
    e.preventDefault();
    this.props.history.pushState(null, '/datatime');
  },

handleLogin: function(e){

    console.log(cookie.load('pre10'));
    console.log(cookie.load('yearly'));
    console.log(this.firstName);
    e.preventDefault();
    this.props.history.pushState(null, '/login');
    
    // this.transitionTo('dashboard');

    return false;

  }

});
export default GraphsPage;