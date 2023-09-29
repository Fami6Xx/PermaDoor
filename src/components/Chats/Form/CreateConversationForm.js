"use client";

import SelectUsers from "@/components/Chats/Form/SelectUsers";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import ConversationKeyInput from "@/components/Chats/Form/ConversationKeyInput";
import {Switch} from "@nextui-org/switch";

const CreateConversationForm = ({users}) => {
	return (
		<div className="flex flex-col gap-6 pt-8">
			<div>
				<Input type="text" variant="bordered" label="Name of conversation" labelPlacement="outside"/>
			</div>
			<div className="flex flex-col gap-4 w-full">
				<ConversationKeyInput/>
				<Switch defaultSelected color="default" className="w-full" size="sm">Save key in browser</Switch>
			</div>

			<SelectUsers users={users}/>

			<Button>
				Create
			</Button>
		</div>
	);
};

export default CreateConversationForm;