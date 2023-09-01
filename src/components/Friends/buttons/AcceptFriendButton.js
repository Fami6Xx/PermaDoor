"use client";

import {Button} from "@nextui-org/button";
import {useState} from "react";

const AcceptFriendButton = ({session, user, succesfull, type}) => {
	const [isProcessing, setProcessing] = useState(false);

	const acceptFriend = (userId) => {
		setProcessing(true);
		fetch("/api/friends/request/accept", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				senderId: userId,
				receiverId: session.data.user.id
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data.error){
				alert(data.error);
				setProcessing(false);
				return;
			}
			setProcessing(false);
			if(succesfull){
				succesfull();
			}
		}).catch(err => {
			console.log(err);
			alert("An error occurred, try it again in few minutes or report it to administrator.");
			setProcessing(false);
		});
	}

	if(!type){
		return (
			<Button variant="bordered" color="primary" isLoading={isProcessing} onPress={() => acceptFriend(user.id)}>Accept request</Button>
		);
	}else{
		return (
			<Button variant="bordered" color="success" isIconOnly isLoading={isProcessing} onPress={() => acceptFriend(user.id)}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" height="1.3em" width="1.3em" className="text-xl text-default-500 pointer-events-none flex-shrink-0">
					<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
				</svg>
			</Button>
		);
	}
}

export default AcceptFriendButton;