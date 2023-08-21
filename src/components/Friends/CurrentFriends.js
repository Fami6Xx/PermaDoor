import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getUserFriendsInfoById} from "@/lib/friends";
import {getServerSession} from "next-auth";
import {Card, CardBody} from "@nextui-org/card";
import FriendCard from "@/components/Friends/FriendCard";

const CurrentFriends = async () => {
	const session = await getServerSession(authOptions);
	const friends = session ? await getUserFriendsInfoById(session.user.id) : null;

	if(friends && friends.length > 0) {
		return (
			<div className="flex flex-row gap-4" key="div-wrapper">
				{friends.map((friend) => (
					<FriendCard friend={friend}/>
				))}
			</div>
		)
	}else {
		return (
			<Card shadow="sm" radius="md" className="w-[200px] ml-4 min-h-[70px]">
				<CardBody className="flex flex-row gap-2">
					<div className="flex flex-col">
						<span className="text-sm font-semibold">Friendships</span>
						<span className="text-xs dark:text-gray-400 light:text-gray-500">We couldnt find any friends</span>
					</div>
				</CardBody>
			</Card>
		)
	}
};

export default CurrentFriends;