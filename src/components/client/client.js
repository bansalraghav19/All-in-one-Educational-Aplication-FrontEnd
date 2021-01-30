import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

import { TextField } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import FaceIcon from "@material-ui/icons/Face";

import "./client.css";
import headers from "./headers";
import Chat from "./chat";
import SendButton from "./sendBtn";

import Loader from '../Loader';


let socket;

class Client extends Component {
	
	constructor(props) {
		super(props);
		this.textInput = React.createRef();
		this.state = {
			text: "",
			allMessages: [],
			roomId: this.props.Room,
			activeUsers: [],
			isLoading:true
		};
		this.handleSend = this.handleSend.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.scrollToBottom = this.scrollToBottom.bind(this);
	}

	scrollToBottom = () => {
		if(this.messagesEnd) this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	};

	componentDidUpdate() {
		this.scrollToBottom();
	}

	async componentDidMount() {
		// this.setState({isLoading: true});
		
		socket = socketIOClient("https://sgbtech96-chat-server.herokuapp.com/");

		console.log("hello",this.state.roomId);
		
		socket.on("connect", async () => {
			
			socket.emit("join", {
				username: "+917983134335",
				room: this.state.roomId,
			});

			console.log("hello",this.state.roomId);

			const res = await axios.get(
				`https://sgbtech96-chat-server.herokuapp.com/chats/${this.state.roomId}`
			);
			console.log(res.data)
			
			if (!res.data) return;
			
			this.setState(
				{
					allMessages: res.data.chats,
				},
				() => {
					console.log(this.state.allMessages);
				}
			);
			this.setState({isLoading: false});
			this.scrollToBottom();
		});

		socket.on("newMessage", (message) => {
			const updatedMessages = [...this.state.allMessages, message];
			this.setState({
				allMessages: updatedMessages,
			});
		});
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	}

	handleSend(event) {
		
		if (this.state.text === "") return;
		
		socket.emit("createMessage",
			{
				text: this.state.text,
				room: this.state.roomId,
				username: "+917983134335",
			},
			() => {
				console.log("callback check");
			}
		);
		
		this.setState(
			{
				text: "",
			},
			() => {
				this.textInput.current.focus();
			}
		);
	}

	render() {

	const { allMessages, activeUsers } = this.state;

	if(this.state.isLoading) return(<Loader/>)

	else
	return (

		<div className="chat-page">
		<div className="sidebar">
			
			<div className="sidebar-text">Active</div>
			
			<div className="sidebar-icon">
				<PeopleAltIcon fontSize="large" />
			</div>

			<div className="sidebar-image">
				<img
				className="actual-image"
				src="https://cdn3.iconfinder.com/data/icons/vector-robots-set-concept-in-blue-color-style/1772/robot_questions_answers_issues_problem_solving_consultant_consultation-512.png"
				/>
			</div>
		</div>

		<div className="contain">
			
			<div className="display-section">
				{
					allMessages.map((msg) => (
						<Chat key={msg.createdAt} message={msg} />
					))
				}

				<div
					style={{ float: "left", clear: "both" }}
					ref={(el) => {
						this.messagesEnd = el;
					}}
				>
				</div>
			</div>

			<div className="send-section">
			<div className="form-contain">

			<div className="form-input">
				<TextField
					value={this.state.text}
					name="text"
					label="Message"
					variant="outlined"
					required={true}
					onChange={this.handleChange}
					placeholder="Type here"
					autoFocus={true}
					fullWidth={true}
					inputRef={this.textInput}
					onKeyPress={(event) => {
						if (event.charCode === 13) {
							this.handleSend();
						}
					}}
				/>
			</div>

			<div className="form-send">
				<SendButton handleSend={this.handleSend} />
			</div>

			</div>
			</div>

		</div>
		
		</div>
	);

	}
}

export default Client;
