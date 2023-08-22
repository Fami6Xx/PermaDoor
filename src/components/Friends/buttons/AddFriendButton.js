"use client";

import {Button} from "@nextui-org/button";
import {useState} from "react";

const AddFriendRouteButton = ({session, user, succesfull}) => {
	const [isProcessing, setProcessing] = useState(false);

	const addFriend = (userId) => {
		setProcessing(true);
		fetch("/api/friends/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				userId: userId,
				currentUserId: session.data.user.id
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
		<Button variant="bordered" isLoading={isProcessing} onPress={() => addFriend(user.id)}>Add</Button>
	);
}

export default AddFriendRouteButton;