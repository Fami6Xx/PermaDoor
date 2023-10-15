"use client";

import SelectUsers from "@/components/Chats/Form/SelectUsers";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Checkbox} from "@nextui-org/checkbox";
import {Tooltip} from "@nextui-org/tooltip";
import {Badge} from "@nextui-org/badge";

const CreateConversationForm = ({users, close}) => {
	const session = useSession();
	const router = useRouter();
	const [value, setValue] = useState("");
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [encrypted, setEncrypted] = useState(false);
	const [loading, setLoading] = useState(false);

	const [errors, setErrors] = useState(false);

	const selectValueChanged = (value) => {
		setSelectedUsers(Array.from(value.values()));
	}

	const sendForm = async () => {
		if(selectedUsers.length === 0) {
			setErrors(true);
			return;
		}

		setLoading(true);

		const response = await fetch("/api/chats/create", {
			method: "POST",
			body: JSON.stringify({
				userId: session.data.user.id,
				name: value,
				users: selectedUsers,
				encrypted: encrypted
			})
		}).then((res) => res.json()).catch((err) => {
			console.error(err);
			return err;
		});

		if(response.status === 200){
			router.refresh();
		}else{
			const message = response.error || response.message || "An error occurred";
			alert(message);
		}

		setLoading(false);
		close();
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

			<SelectUsers users={users} selectionChanged={selectValueChanged} errors={errors}/>

			<div>
				<Checkbox color="default" isSelected={encrypted} onValueChange={setEncrypted}>Password secured</Checkbox>
				<Tooltip content="The password will be set when first accessing the conversation." color="warning" showArrow>
					<Badge content="?" color="default" isOneChar>
						<p className="ml-2">⠀</p>
					</Badge>
				</Tooltip>
			</div>

			<Button variant="ghost" onPress={sendForm} isLoading={loading}>
				Create
			</Button>
		</div>
	);
};

export default CreateConversationForm;