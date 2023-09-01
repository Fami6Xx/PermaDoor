"use client";

import {Button} from "@nextui-org/button";
import {useState} from "react";
import {useRouter} from "next/navigation";

const AcceptFriendButton = ({session, user, succesfull, type, refresh}) => {
	const [isProcessing, setProcessing] = useState(false);

	const acceptFriend = () => {
		setProcessing(true);
		fetch("/api/friends/request/accept", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				senderId: user.id,
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
			if(refresh){
				useRouter().refresh();
			}
		}).catch(err => {
			console.log(err);
			alert("An error occurred, try it again in few minutes or report it to administrator.");
			setProcessing(false);
		});
	}

	if(!type){
		return (
			<Button variant="bordered" color="primary" isLoading={isProcessing} onPress={() => acceptFriend()}>Accept request</Button>
		);
	}else{
		return (
			<Button variant="bordered" color="success" isIconOnly isLoading={isProcessing} onPress={() => acceptFriend()}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" height="1.3em" width="1.3em" className="text-xl text-default-500 pointer-events-none flex-shrink-0">
					<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
				</svg>
			</Button>
		);
	}
}

export default AcceptFriendButton;