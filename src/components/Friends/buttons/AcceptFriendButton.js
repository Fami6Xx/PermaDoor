"use client";

import {Button} from "@nextui-org/button";
import {useState} from "react";

const AcceptFriendButton = ({session, user, succesfull}) => {
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

	return (
		<Button variant="bordered" color="primary" isLoading={isProcessing} onPress={() => acceptFriend(user.id)}>Accept request</Button>
	)
}

export default AcceptFriendButton;