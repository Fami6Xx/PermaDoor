import {getAllConversations} from "@/lib/converstation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import CreateConversationButton from "@/components/Chats/CreateConverstationButton";
import {getUserFriendsInfoById} from "@/lib/friends";

const Page = async () => {
	const session = await getServerSession(authOptions);
	const friends = await getUserFriendsInfoById(session.user.id);
	const conversations = await getAllConversations(session.user.id);
	return (
		<>
			<h1 className="text-2xl font-bold">Chats</h1>
			<pre>{JSON.stringify(conversations, null, 1)}</pre>

			<CreateConversationButton users={friends}/>
		</>
	);
};

export default Page;