"use client";

import {useState} from "react";
import {Button} from "@nextui-org/button";

const DeclineFriendButton = ({session, friend, succesfull}) => {
	const [isProcessing, setIsProcessing] = useState(false);

	const declineFriend = () => {
		setIsProcessing(true);
		fetch("/api/friends/request/decline", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				receiverId: session.data.user.id,
				senderId: friend.id
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data.error){
				alert(data.error);
				setIsProcessing(false);
				return;
			}

			setIsProcessing(false);

			if(succesfull){
				succesfull();
			}
		}).catch(err => {
			console.log(err);
			alert("An error occurred, try it again in few minutes or report it to administrator.");
			setIsProcessing(false);
		});
	}

	return (
		<>
			<Button variant="bordered" color="warning" isLoading={isProcessing} onPress={() => declineFriend(user.id)}>Decline request</Button>
		</>
	);
};

export default DeclineFriendButton;