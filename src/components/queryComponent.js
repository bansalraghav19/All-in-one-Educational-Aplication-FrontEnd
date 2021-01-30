import React , { useState, useEffect } from 'react';
import { Switch, Route, Redirect, NavLink, Link, useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import axios from "axios";
import Client from "./client/client"

import Card from './Card';

const useStyles = makeStyles(() => ({
      "clearfix:after": {
		content: "",
		display: "table",
		clear: "both" 
	},
	row:{
		width:"100%",
		height:"100%",
	},
	row1:{
		width:"100%",
		height:"100%",
		marginTop:"3%",

		'&:after':{
			content: '" "',
			display: "table",
			clear: "both" 
		}
		
	},
	row2:{
		width:"25%",
		height:"40%",
		marginTop:"3%",
		marginLeft:"37%",
		marginBottom:"14%"
	},
	csub1:{
		float:"left",
		marginLeft:"4%",
		height:"50%",
		width:"25%",
		marginTop:"8%"
	},
	csub2:{
		float:"left",
		marginLeft:"9%",
		height:"100%",
		width:"25%"
	},
	csub21:{
		height:"37%",
		width:"100%"
	},
	csub22:{
		marginTop:"22%",
		height:"37%",
		width:"100%"
	},
	csub3:{
		float:"left",
		marginLeft:"11%",
		height:"50%",
		width:"25%",
		marginTop:"8%"
	}
}));


export default function Query(props){

	const history=useHistory();

	const handlesubmit=async(e)=>{
		
		const subject=e.target.name;
		
		var number={ 
			"Physics": "+919644012345",
			"Maths": "+917994012369",
			"Chemistry": "+918344012152" 
		}
	
		var tNumber=number[subject]
		var userPhone="+917983134335"

		var res=await axios.post("https://sgbtech96-chat-server.herokuapp.com/room",{
			"ph1": tNumber,
			"ph2":"+917983134335"
		})

		var roomID= res.data;
		props.changeRoomID(roomID)
		console.log(roomID)
		history.push("/chat");

	};

	const styles = useStyles();

	return (
	<div className={styles.row}>
		<div className={styles.row1}>
			<div className={styles.csub1}>
			<Card  handlesubmit={handlesubmit} sub={"Maths"} content={'Dear math, I am sick and tired of finding your "x" just accept the fact that she is gone Move On, DuDe'}/>
			</div>
			<div className={styles.csub2}>
				<div className={styles.csub21}>
				<Card  handlesubmit={handlesubmit} sub={"Chemistry"} content={"not to get technical ... but according to chemistry, alcohol is a solution"}/>
				</div>
				<div className={styles.csub22}>
				<Card  handlesubmit={handlesubmit} sub={"Biology"} content={'Biology is the study of the complex things in the Universe.'}/>
				</div>
			</div>
			<div className={styles.csub3}>
			<Card  handlesubmit={handlesubmit} sub={"Physics"} content={"i am not lazy i'm overflowing with potential energy"}/>
			</div>
		</div>
	</div>
	);
}

