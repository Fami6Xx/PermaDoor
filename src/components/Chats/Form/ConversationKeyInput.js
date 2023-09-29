"use client";

import {Input} from "@nextui-org/input";
import {useEffect, useState} from "react";
import EyeSlashFilledIcon from "@/components/Chats/Form/Icons/EyeSlashFilledIcon";
import EyeFilledIcon from "@/components/Chats/Form/Icons/EyeFilledIcon";

/**
 *
 * @param keyChange {function} - Function that will be called when key changes
 * @returns {JSX.Element}
 * @constructor
 */
const ConversationKeyInput = ({keyChange}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [value, setValue] = useState("");

	useEffect(() => {
		keyChange ? keyChange(value) : null;
	}, []);

	const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<Input
			label="Conversation key"
			labelPlacement="outside"
			variant="bordered"
			placeholder="Enter your key"
			autoCorrect="key"
			endContent={
				<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
					{isVisible ? (
						<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
					) : (
						<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
					)}
				</button>
			}
			value={value}
			onValueChange={setValue}
			type={isVisible ? "text" : "password"}
			className="max-w-xs"
		/>
	);
};

export default ConversationKeyInput;