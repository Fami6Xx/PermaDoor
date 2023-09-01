import Wrapper from "@/components/Friends/Wrapper";
import {getFriendRequests} from "@/lib/friends";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth";
import RequestCard from "@/components/FriendRequests/RequestCard";

const CurrentRequests = async () => {
	const session = await getServerSession(authOptions);
	console.log(session);
	const friendRequests = session ? await getFriendRequests(session.user.id) : null;
	console.log(friendRequests);
	if(friendRequests && friendRequests.length > 0) {
		return (
			<>
				<Wrapper>
					{friendRequests.map((friendRequest, index) => (
						<RequestCard key={index} request={friendRequest} session={session}/>
					))}
				</Wrapper>
			</>
		);
	}else {
		return (
			<Wrapper>
				<span className="dark:text-gray-400 light:text-gray-500">We couldn't find any friend requests</span>
			</Wrapper>
		);
	}
};

export default CurrentRequests;