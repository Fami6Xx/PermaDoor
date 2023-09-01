"use client";

import {useState} from "react";
import {Button} from "@nextui-org/button";
import {useRouter} from "next/navigation";

const DeclineFriendButton = ({session, user, succesfull, type, refresh}) => {
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
				senderId: user.id
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

			if(refresh){
				useRouter().refresh();
			}
		}).catch(err => {
			console.log(err);
			alert("An error occurred, try it again in few minutes or report it to administrator.");
			setIsProcessing(false);
		});
	}

	return (
		<>
			{!type &&
				<Button variant="bordered" color="danger" isLoading={isProcessing} onPress={() => declineFriend()}>Decline request</Button>
			}
			{type &&
				<Button variant="bordered" color="danger" isIconOnly isLoading={isProcessing} onPress={() => declineFriend()}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" height="1.3em" width="1.3em" className="text-xl text-default-500 pointer-events-none flex-shrink-0">
						<path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
					</svg>
				</Button>
			}
		</>
	);
};

export default DeclineFriendButton;