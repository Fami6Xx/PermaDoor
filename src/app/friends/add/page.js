"use client";

import SearchUser from "@/components/Friends/add/SearchUser";
import {useSession} from "next-auth/react";
import {useEffect, useRef, useState} from "react";
import {Card, CardBody, CardFooter} from "@nextui-org/card";
import Image from 'next/image'
import {Button} from "@nextui-org/button";
import AddFriendButton from "@/components/Friends/buttons/AddFriendButton";

const Page = () => {
	const session = useSession();
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [isProcessing, setProcessing] = useState(false);

	let searchValue = useRef("");

	const search = (value) => {
		setLoading(true);
		searchValue.current = value;
		fetch("/api/user/find?query=" + value + "&currentUserId=" + session.data.user.id)
		.then(res => res.json())
		.then(data => {
			if(data.length === 0){
				setError("No users found");
				setUsers([]);
				return;
			}
			setError(null);
			setProcessing(false);
			setUsers(data);
		}).catch(err => {
			console.log(err);
			setError("An error occurred");
			setUsers([]);
			setLoading(false);
			setProcessing(false);
		});
	}

	const acceptFriend = (userId) => {
		setProcessing(true);
		fetch("/api/friends/accept", {
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
				setProcessing(false)
				return;
			}
			search(searchValue.current);
		}).catch(err => {
			console.log(err);
			alert("An error occurred, try it again in few minutes or report it to administrator.");
			setProcessing(false)
		})
	}

	useEffect(() => {
		if(loading){
			setLoading(false);
		}
	}, [users, error]);

	return (
		<>
			<div className="flex flex-row gap-2 md:gap-8 justify-center content-center items-center w-full md:mt-16 mt-8">
				<h1 className="text-3xl font-bold ml-6 mt-3">Find friends</h1>
				<SearchUser search={search}/>
			</div>

			<div className="md:m-auto md:w-[80vw] mt-8 rounded-none md:rounded-lg md:mt-8 dark:bg-opacity-30 md:dark:bg-opacity-50 lg:h-[34vw] min-h-[500px] max-h-[1000px] bg-content1 box-border shadow-small overflow-hidden">
				<div className="m-7 w-[calc(100%-56px)] min-h-[calc(500px-56px)] max-h-[calc(1000px-56px)] h-[calc(100%-56px)] overflow-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 justify-center">
					{!loading && users.map((user, index) => (
						<Card key={`${user.global_name}-${index}`} className="max-w-[16rem] min-w-[9rem] md:min-w-[10rem] max-h-32 min-h-[8rem] flex-initial">
							<CardBody className="pb-0">
								<div className="flex flex-row gap-2 h-12 items-center">
									<Image src={user.image} alt={user.global_name} width={32} height={32} className="rounded-lg w-10 h-10"/>
									<div className="h-full text-lg font-semibold items-center flex overflow-hidden w-full">
										<p className="w-full overflow-ellipsis whitespace-nowrap overflow-hidden">
											{user.global_name}
										</p>
									</div>
								</div>
							</CardBody>
							<CardFooter className="flex justify-end w-full pt-0">
								{!user.isFriend && !user.isPending &&
									<AddFriendButton session={session} user={user} succesfull={() => search(searchValue.current)}/>
								}
								{user.isFriend &&
									<Button variant="bordered" color="success" isDisabled>Friends</Button>
								}
								{user.isPending && user.sendFriendRequest &&
									<Button variant="bordered" color="success" isDisabled>Request sent</Button>
								}
								{user.isPending && user.receivedFriendRequest &&
									<Button variant="bordered" color="primary" isLoading={isProcessing} onPress={() => acceptFriend(user.id)}>Accept request</Button>
								}
							</CardFooter>
						</Card>
					))}
					{!loading && error && (
						<p className="w-full text-center items-center font-semibold text-slate-300 col-span-full">{error}</p>
					)}
					{loading && (
						<div className="w-full h-full flex justify-center items-center col-span-full row-span-full">
							<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Page;