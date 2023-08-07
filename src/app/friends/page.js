import CurrentFriends from "@/components/Friends/CurrentFriends";
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import AddFriendButton from "@/components/Friends/AddFriendButton";

const Page = () => {
	return (
		<>
			<Card shadow="md" className="md:m-auto md:w-[80vw] mt-8 rounded-none md:rounded-lg md:mt-8 dark:bg-opacity-30 md:dark:bg-opacity-50 lg:h-[19vw]">
				<CardHeader className="text-3xl font-bold ml-6 mt-3">Friends</CardHeader>
				<CardBody>
					<CurrentFriends/>
				</CardBody>
				<CardHeader className="text-3xl font-bold ml-6 mt-3">Friend requests</CardHeader>
				<CardBody>
					<p>FR</p> {/* TODO */}
				</CardBody>
			</Card>

			<AddFriendButton/>
		</>
	);
};

export default Page;