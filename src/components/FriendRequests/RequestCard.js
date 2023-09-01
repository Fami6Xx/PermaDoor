import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import AcceptFriendButton from "@/components/Friends/buttons/AcceptFriendButton";
import DeclineFriendButton from "@/components/Friends/buttons/DeclineFriendButton";
import Image from "next/image";

const RequestCard = async ({request, session}) => {
	return (
		<>
			<Card className="w-[150px]">
				<CardHeader className="w-full flex justify-center">
					<Image src={request.image} alt={request.global_name} width={64} height={64} className="rounded-full w-16 h-16"/>
				</CardHeader>
				<CardBody className="w-full pt-0">
					<span className="w-full text-center text-default-500 text-xl font-bold overflow-ellipsis whitespace-nowrap overflow-hidden">{request.global_name}</span>
				</CardBody>
				<CardFooter className="w-full flex flex-row justify-around">
					<DeclineFriendButton friend={request.sender} session={session} type="icon"/>
					<AcceptFriendButton user={request.sender} session={session} type="icon"/>
				</CardFooter>
			</Card>
		</>
	);
};

export default RequestCard;