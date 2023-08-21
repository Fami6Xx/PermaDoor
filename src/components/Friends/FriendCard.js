"use client";

import {Card, CardBody} from "@nextui-org/card";
import Image from "next/image";
import {timeAgo} from "@/lib/time";
import {useDisclosure} from "@nextui-org/react";
import {Modal, ModalContent} from "@nextui-org/modal";

const FriendCard = ({friend}) => {
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	return (
		<>
			<Card shadow="sm" radius="md" isHoverable isPressable onPress={onOpen}>
				<CardBody className="flex flex-row gap-2">
					<Image key={friend.id + "--image"} src={friend.image} alt={friend.global_name} width={64} height={64} className="rounded-full w-10 h-10"/>
					<div className="flex flex-col w-40 h-10">
						<div className="h-full text-lg font-semibold items-center flex overflow-hidden w-full">
									<span className="w-full overflow-ellipsis whitespace-nowrap overflow-hidden">
										{friend.global_name}
									</span>
						</div>
						<span
							className="text-xs dark:text-gray-400 light:text-gray-500">Added: {timeAgo(friend.friendshipCreatedAt)}</span>
					</div>
				</CardBody>
			</Card>

			<Modal
			>
				<ModalContent>
					{(onClose) => (
						<>

						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default FriendCard;