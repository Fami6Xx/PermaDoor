"use client";

import {Button} from "@nextui-org/button";
import {useState} from "react";

const RemoveFriendButton = ({session, user, succesfull}) => {
	const [isProcessing, setProcessing] = useState(false);

	const removeFriend = (userId) => {
		setProcessing(true);
		fetch("/api/friends/remove", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				userId: session.data.user.id,
				friendId: userId
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
		<>
			<Button variant="bordered" color="danger" isLoading={isProcessing} onPress={() => removeFriend(user.id)}>
				Remove
			</Button>
		</>
	);
};

export default RemoveFriendButton;