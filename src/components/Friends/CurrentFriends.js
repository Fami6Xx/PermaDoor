import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getUserFriendsInfoById} from "@/lib/friends";
import {getServerSession} from "next-auth";
import Image from "next/image";
import {Card, CardBody} from "@nextui-org/card";

const CurrentFriends = async () => {
	const session = await getServerSession(authOptions);
	const friends = session ? await getUserFriendsInfoById(session.user.id) : null;

	if(friends && friends.length > 0) {
		return (
			<div className="ml-4" key="div-wrapper">
				{friends.map((friend) => (
					<Card shadow="sm" radius="md">
						<CardBody className="flex flex-row gap-2">
							<Image key={friend.id + "--image"} src={friend.image} alt={friend.global_name} width={64} height={64} className="rounded-full w-10 h-10"/>
							<div className="flex flex-col">
								<span className="text-sm font-semibold">{friend.global_name}</span>
								<span
									className="text-xs dark:text-gray-400 light:text-gray-500">Added on {friend.friendshipCreatedAt.toString()}</span>
							</div>
						</CardBody>
					</Card>
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