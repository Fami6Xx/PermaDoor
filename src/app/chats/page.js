import {getAllConversations} from "@/lib/converstation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import CreateConversationButton from "@/components/Chats/CreateConverstationButton";
import {getUserFriendsInfoById} from "@/lib/friends";
import ChatCard from "@/components/Chats/Card/ChatCard";

const Page = async () => {
	const session = await getServerSession(authOptions);
	const friends = await getUserFriendsInfoById(session.user.id);
	const conversations = await getAllConversations(session.user.id);

	// Sort conversations by last action
	conversations.sort((a, b) => {
		console.log("Sorting: ", a, b);
		console.log("Output: ", b.lastAction - a.lastAction);
		console.log("")
		return b.lastAction - a.lastAction;
	});

	return (
		<>

			<div className="w-full md:m-auto md:w-[80vw] mt-4 md:mt-4 box-border">
				<div className="w-[calc(100%)] p-4 md:p-7 md:w-[calc(100%-56px)] flex flex-col gap-4">
					{
						conversations.map((conversation, id) => (
							<ChatCard conversation={conversation} key={id}/>
						))
					}
				</div>
			</div>


			<CreateConversationButton users={friends}/>
		</>
	);
};

export default Page;