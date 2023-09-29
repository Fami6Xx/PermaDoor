import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getUserFriendsInfoById} from "@/lib/friends";
import CreateConversationForm from "@/components/Chats/Form/CreateConversationForm";

const Page = async () => {
	const session = await getServerSession(authOptions);
	const friends = await getUserFriendsInfoById(session.user.id);

	return (
		<>
			<div className="w-full flex justify-center">
				<CreateConversationForm users={friends}/>
			</div>
		</>
	);
};

export default Page;