import React from 'react';
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';
import moment from 'moment'

import './client.css'

const generateTemplate = (message) => {
	
	const formattedTime = moment(message.createdAt).format('h:mm a');
	
	return (
		<div className="wrap-data">
			<div className="head-data">
			<div>{message.from}</div>
			<div>{formattedTime}</div>
			</div>
			<div className="content-data">{message.text}</div>
		</div>
	)
}

const Chat = (props) => (
	<div>
		{  
			props.message.from === localStorage.phno?
			<ChatMsg
				messages={[generateTemplate(props.message)]}
			/>
			:
			<ChatMsg
				side={'right'}
				messages={[generateTemplate(props.message)]}
			/>
		}
	</div>
);

export default Chat;