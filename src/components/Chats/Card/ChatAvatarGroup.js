"use client";

import {AvatarGroup} from "@nextui-org/avatar";

const ChatAvatarGroup = ({avatars}) => {
	return (
		<>
			<AvatarGroup isBordered max={4}>
				{avatars}
			</AvatarGroup>
		</>
	);
};

export default ChatAvatarGroup;