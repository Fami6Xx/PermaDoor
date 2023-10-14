import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Avatar} from "@nextui-org/avatar";
import ChatAvatarGroup from "@/components/Chats/Card/ChatAvatarGroup";

const ChatCard = ({conversation}) => {
	const avatars = conversation.users.map((user) => (
		<Avatar src={user.image}/>
	));

	return (
		<>
			<Card shadow="lg">
				<CardHeader>
					<ChatAvatarGroup avatars={avatars}/>
					<div className="pl-5">
						{conversation.name}
					</div>
				</CardHeader>
				<CardBody>
					{
						conversation.encrypted ? (
							<p>Conversation encrypted</p>
						)
							:
							(
								<p>Message</p>
							)
					}
				</CardBody>
			</Card>
		</>
	);
};

export default ChatCard;