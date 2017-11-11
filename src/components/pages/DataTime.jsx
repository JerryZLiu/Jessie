import React from 'react';
import Router from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import { History } from 'history';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from "jQuery";
import cookie from 'react-cookies';
import Typist from 'react-typist';
var DataTimePage = React.createClass({

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
              <h1>{"Wow! In ten years, if you kept your excess savings in a savings account you would have $" + parseInt(cookie.load('pre10')).toFixed(2)}</h1> 
              <h1>{"But if you invested that extra money in an ETF like the S&P 500, you would have $" + parseInt(cookie.load('post10')).toFixed(2)} </h1> 
              <h1><small>{ "20 years in savings, $" + cookie.load('pre20')} </small></h1> 
              <h1><small>{ "20 years in S&P 500, $" + parseInt(cookie.load('post20')).toFixed(2)} </small></h1> 
              <h1><small>{ "30 years in savings, $" + cookie.load('pre30')} </small></h1> 
              <h1><small>{ "30 years in S&P 500, $" + parseInt(cookie.load('post30')).toFixed(2)} </small></h1> 
              <form role="form" onSubmit={this.handleNext} className="ng-pristine ng-valid"> 
                <button type="submit" className="btn btn-white btn-outline btn-lg btn-rounded">Let me try a different yearly deposit!</button> 
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

  setLoginID: function(e) {
    cookie.save('firstName', e.target.value, { path: '/' });
    this.setState({
      loginID: e.target.value,
      loginError: ''
    });

  },

  setPassword: function(e) {
    cookie.save('userId', e.target.value, { path: '/' });
    this.setState({
      password: e.target.value,
      loginError: ''
    });

  },

  getC1Balance: function() {
  console.log("talking at server");
    fetch("http://api.reimaginebanking.com/accounts/" + cookie.load('userId') + "?key=cba02054fa632e43f7d01e638fc75786").then((response) => response.json()).then((responseJson) => 
{ cookie.save('balance', responseJson.balance, { path: '/' });
      }).catch((error) => {
        console.error(error);
      });
  },

  getC1Income: function() {
    console.log("talking at server");
    fetch("http://api.reimaginebanking.com/accounts/" + cookie.load('userId') + "/deposits?key=cba02054fa632e43f7d01e638fc75786").then(
        (response) => response.json()).then(function(data) {
    let deps = data;
    return deps.map(function(dep) {
      cookie.save('income', dep.amount, { path: '/' });
    })
  }).catch((error) => {
        console.error(error);
    });
},

getC1Expenditures: function() {
    console.log("talking at server");
    fetch("http://api.reimaginebanking.com/accounts/" + cookie.load('userId') + "/bills?key=cba02054fa632e43f7d01e638fc75786").then(
        (response) => response.json()).then(function(data) {
    let deps = data;
    return deps.map(function(dep) {
      cookie.save('expenditures', dep.payment_amount, { path: '/' });
    })
  }).catch((error) => {
        console.error(error);
    });
},

handleNext: function(e){
    e.preventDefault();
    this.props.history.pushState(null, '/graphs');
  },

  handleLogin: function(e){
     console.log("fuck");
    console.log(cookie.load('userId'));
    console.log(this.firstName);
    e.preventDefault();
    this.props.history.pushState(null, '/login');
    
    // this.transitionTo('dashboard');

    return false;

  }

});

export default DataTimePage;