import CurrentFriends from "@/components/Friends/CurrentFriends";
import AddFriendRouteButton from "@/components/Friends/buttons/AddFriendRouteButton";
import CurrentRequests from "@/components/FriendRequests/CurrentRequests";

const Page = () => {
	return (
		<>
			<div className="md:m-auto mt-8 md:mt-8 md:w-[80vw] ml-4 flex flex-col gap-4">
				<h1 className="text-3xl font-bold ml-6 mt-3">Friends</h1>
				<div>
					<CurrentFriends/>
				</div>
				<div>
					<h1 className="text-3xl font-bold ml-6 mt-3">Friend requests</h1>
				</div>
				<div>
					<CurrentRequests/>
				</div>
			</div>
		</>
	);
};

export default Page;