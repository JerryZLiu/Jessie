import React from 'react';
import Router from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import { History } from 'history';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from "jQuery";
import cookie from 'react-cookies';
var CoreJessiePage = React.createClass({

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
              <h1> {"Hi " + cookie.load('firstName') + ", let's take a look at your financials over the past 6 months!"} </h1> 
              <h1> <small> {"Total savings: $" +  cookie.load('balance')} </small></h1>
              <h1> <small> {"Income over the last 6 months: $" +  cookie.load('income')} </small></h1>
              <h1> <small> {"Expenditures over the last 6 months:  $" +  cookie.load('expenditures')} </small></h1>
              <h1> {"Great job, " + cookie.load('firstName') + ", you've built up a sizeable amount of savings! However, there may be a way to better" +  " optimize your finances..."} </h1>
              <h1> {"Most financial experts say that keeping 6 months of expenses is enough for an emergency savings fund. Since " + 
              "you have excess savings of $" + (cookie.load('balance')-cookie.load('expenditures')) + ", there is a huge upside " +
              "to investing on the stock market."} </h1>
              <form role="form" onSubmit={this.handleNext} className="ng-pristine ng-valid"> 
                <button type="submit" className="btn btn-white btn-outline btn-lg btn-rounded">I want to learn more!</button> 
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
    cookie.save('userId', e.target.value, { path: '/' });
    this.setState({
      loginID: e.target.value,
      loginError: ''
    });

  },

  setPassword: function(e) {
    console.log("fuck1");
    this.setState({
      password: e.target.value,
      loginError: ''
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

export default CoreJessiePage;