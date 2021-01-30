import React , { Component } from 'react';
import { Switch, Route, Redirect, NavLink,useHistory} from 'react-router-dom';
import './CSS/Login.css';
import {sendotp,verifyotp,register,login} from '../shared/http';
import HomeComponent from './HomeComponent';

function Votp({input,contactnumber,assignnumber}){
	
	const history=useHistory();

	if(contactnumber==null){
		history.push("/signup");
	}
	const myinput = {
		otp:''
	}

	const handlesubmit=async (event)=>{
		event.preventDefault();
		var res= await verifyotp(myinput.otp.value,contactnumber);
		if(res.message=="OTP Verified"){
			history.push("/register");
		}
		else{
			assignnumber(null);
		}
	}
	
	return(
		<div>
			<div>Enter "superUser" if OTP not recieved</div>
			<form onSubmit={handlesubmit}>
			<input type="text" id="login-contactnumber" ref={(input)=>myinput.otp=input} placeholder="OTP" required/>
			<input type="submit" id="login-submit" placeholder="Verify Otp" required value="Next"/>
			</form> 
		</div>    
	);
}

function Register({input,changestate,contactnumber}){

	const history=useHistory();
	
	if(contactnumber==null){
		history.push("/signup");
	}

	const myinput = {
		fname:'',
		lname:'',
		pass:'',
		email:'',
		state:'',
		city:'',
		grade:'',
		board:''
	}

	const handlesubmit= async (event)=>{
		event.preventDefault();
		var res= await register(myinput.fname.value,myinput.lname.value,contactnumber,myinput.pass.value,
		myinput.email.value,myinput.state.value,myinput.city.value,myinput.grade.value,myinput.board.value);
		console.log(res,'2');
		if(res.message=="Successfully registered"){
			localStorage.setItem("token",res.token)
			changestate(true);
		}
	}
	
	return(
		<form className="register" onSubmit={handlesubmit}>
			<input type="text" id="login-firstname" ref={(input)=>myinput.fname=input} placeholder="First Name" required/>
			<input type="text" id="login-lastname" ref={(input)=>myinput.lname=input} placeholder="Last Name" required/>
			<input type="password" id="login-password" ref={(input)=>myinput.pass=input} placeholder="Password" required/>
			<input type="text" id="login-emailid" ref={(input)=>myinput.email=input} placeholder="Email Id" required/>
			<input type="text" id="login-state" ref={(input)=>myinput.state=input} placeholder="State" required/>
			<input type="text" id="login-city" ref={(input)=>myinput.city=input} placeholder="City" required/>
			<input type="text" id="login-grade" ref={(input)=>myinput.grade=input} placeholder="Grade" required/>
			<input type="text" id="login-board" ref={(input)=>myinput.board=input} placeholder="Board" required/>
			<input type="submit" id="login-submit" placeholder="Register" required value="Register"/>
		</form>     
	);
}


function SignIn({input,changestate,changeHome,changeLoading}){
	
	const history=useHistory();

	const myinput = {
		num:'',
		pass:''
	}

	const handlesubmit=async (event)=>{
		changeLoading(true);
		event.preventDefault();

		var res=await login(myinput.num.value,myinput.pass.value);
		console.log(res,' res ');
		if(res.err){
			console.log(res.err);
		}
		if(res.token){
			localStorage.token=res.token;
			changestate(true);
		}
		changeLoading(false)
	
	}
  
	return(
		<form onSubmit={handlesubmit}>
			<input type="text" id="login-contactnumber" ref={(input)=>myinput.num=input} placeholder="Mobile Number" required/>
			<input type="password" id="login-password" ref={(input)=>myinput.pass=input} placeholder="Enter Password" required/>
			<input type="submit" id="login-submit" placeholder="Login" value="Login" required/>
			<div className="login-text"> Not Connected Yet ?</div>
			<NavLink  className="nav-link login-nav-link"  to='/signup'>Create Account Now !</NavLink>
			{/* <NavLink onClick={()=>{changeHome(true);}} className="nav-link login-nav-link" to='#'>Return back to home !</NavLink> */}
			
		</form>     
	);
}

function SignUp({input,assignnumber}){
	
	console.log("hello");
	const history=useHistory();
	const myinput = {
		num:''
	}

	const handlesubmit=async (event)=>{
		event.preventDefault();
		var res=await sendotp(myinput.num.value);
		console.log(res.message,"otp")
		if(res.message=="OTP Sent"){
			assignnumber(myinput.num.value);
			history.push("/verifyotp");
		}
	}

	return(     
		<form onSubmit={handlesubmit}>
			<input type="text" id="login-contactnumber" ref={(input)=>myinput.num=input} placeholder="Mobile Number" required/>
			<input type="submit" id="login-submit" required value="Next"/>
			<div className="login-text"> Already Registered ?</div>
			<NavLink className="nav-link login-nav-link"  to='/signin'>Login Here</NavLink>
		</form>     
	);
}

class Login extends Component{

	constructor(props){
		
		super(props);
		this.input = React.createRef();
		this.state={
			contactnumber:null
		};
		this.assignnumber=this.assignnumber.bind(this);
	}

	assignnumber(num){
		this.setState({
			contactnumber:num
		});
	}
	
	render(){
		return(
			<div className="login-container clearfix">
			<div className="login-first-col">
				<img src="./assets/undraw_press_play.svg" alt="student"></img>
			</div>
			<div className="login-second-col">
				<h1><span>Quick</span> Study</h1>
				<Switch>
					<Route path='/signin' component={()=><SignIn input={this.input} changestate={this.props.changestate} changeHome={this.props.changeHome} changeLoading={this.props.changeLoading}/>} />
					<Route path='/signup' component={()=><SignUp input={this.input} assignnumber={this.assignnumber} changeHome={this.props.changeHome}/>}/>
					<Route path='/verifyotp' component={()=><Votp input={this.input} contactnumber={this.state.contactnumber} assignnumber={this.assignnumber}/>}/>
					<Route path='/register' component={()=><Register input={this.input} changestate={this.props.changestate} contactnumber={this.state.contactnumber}/>}/>
					<Redirect to="/signin"/>
				</Switch>    
			</div>
			</div>
		);
	}
}
export default Login;