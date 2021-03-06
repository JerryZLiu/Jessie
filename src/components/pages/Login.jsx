import React from 'react';
import Router from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import { History } from 'history';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from "jQuery";
import cookie from 'react-cookies';
import Typist from 'react-typist';
var LoginPage = React.createClass({

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
              <h1>Hi, I'm Jessie </h1> 
              <h1> <small> Let me help you secure your financial future</small></h1>
              <form role="form" onSubmit={this.handleLogin} className="ng-pristine ng-valid"> 
                <div className="form-content"> 
                  <div className="form-group"> 
                    <input type="text" onChange={ this.setLoginID } className="form-control input-underline input-lg" placeholder="Name" /> 
                  </div> 
                  <div className="form-group"> 
                    <input type="password" onChange={ this.setPassword } className="form-control input-underline input-lg" placeholder="Account ID" /> 
                  </div> 
                </div> 
                <button type="submit" className="btn btn-white btn-outline btn-lg btn-rounded">Start</button> 
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

  handleLogin: function(e){
  console.log(cookie.load('userId'));
    this.getC1Balance();
    this.getC1Income();
    this.getC1Expenditures();
  	
    console.log(cookie.load('firstName'));
    console.log(cookie.load('balance'));
    console.log(cookie.load('expenditures'));
    console.log(cookie.load('income'));

    e.preventDefault();
    this.props.history.pushState(null, '/corejessie');
    
    // this.transitionTo('dashboard');

    return false;

  }

});

export default LoginPage;