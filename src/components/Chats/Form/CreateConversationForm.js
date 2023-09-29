"use client";

import SelectUsers from "@/components/Chats/Form/SelectUsers";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {useState} from "react";
import {useSession} from "next-auth/react";

const CreateConversationForm = ({users}) => {
	const session = useSession();
	const [value, setValue] = useState("");
	const [selectedUsers, setSelectedUsers] = useState([]);

	const selectValueChanged = (value) => {
		setSelectedUsers(Array.from(value.values()));
	}

	const sendForm = async () => {
		const response = await fetch("/api/chats/create", {
			method: "POST",
			body: JSON.stringify({
				userId: session.data.user.id,
				name: value,
				users: selectedUsers
			})
		}).then((res) => res.json()).catch((err) => console.error(err));
	}

	return (
		<div className="flex flex-col gap-6 pt-4 pb-3">
			<Input
				type="text"
				variant="bordered"
				label="Name of conversation"
				labelPlacement="outside"
				placeholder="Our super secret conversation"
				value={value}
				onValueChange={setValue}
			/>

			<SelectUsers users={users} selectionChanged={selectValueChanged}/>

			<Button variant="ghost" onPress={sendForm}>
				Create
			</Button>
		</div>
	);
};

export default CreateConversationForm;