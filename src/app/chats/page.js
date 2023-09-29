import {getAllConversations} from "@/lib/converstation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import CreateConversationButton from "@/components/Chats/CreateConverstationButton";

const Page = async () => {
	const session = await getServerSession(authOptions);
	const conversations = await getAllConversations(session.user.id);
	return (
		<>

			<CreateConversationButton/>
		</>
	);
};

export default Page;