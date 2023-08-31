import Wrapper from "@/components/Friends/Wrapper";
import {getFriendRequests} from "@/lib/friends";

const CurrentRequests = async () => {
	const friendRequests = await getFriendRequests();

	console.log(friendRequests);

	return (
		<>
			<Wrapper>

			</Wrapper>
		</>
	);
};

export default CurrentRequests;