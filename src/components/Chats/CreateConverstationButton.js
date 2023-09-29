"use client";

import {Button} from "@nextui-org/button";
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover";
import CreateConversationForm from "@/components/Chats/Form/CreateConversationForm";
import {useState} from "react";

const CreateConversationButton = ({users}) => {
	const [isOpen, setIsOpen] = useState(false);

	const closePopover = () => setIsOpen(false);

	return (
		<Popover showArrow="true" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
			<PopoverTrigger>
				<Button isIconOnly variant="ghost" aria-label="Add friend" className="fixed bottom-8 right-8">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<CreateConversationForm users={users} close={closePopover}/>
			</PopoverContent>
		</Popover>
	);
};

export default CreateConversationButton;