"use client";

import {Card, CardBody} from "@nextui-org/card";
import Image from "next/image";
import {timeAgo} from "@/lib/time";
import {useDisclosure} from "@nextui-org/react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {Avatar} from "@nextui-org/avatar";
import RemoveFriendButton from "@/components/Friends/buttons/RemoveFriendButton";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

const FriendCard = ({friend}) => {
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const session = useSession();
	const router = useRouter();

	return (
		<>
			<Card shadow="sm" radius="md" isHoverable isPressable onPress={onOpen} className="shrink-0 dark:bg-none bg-gradient-to-br from-white to-default-200">
				<CardBody className="flex flex-row gap-2">
					<Image key={friend.id + "--image"} src={friend.image} alt={friend.global_name} width={64} height={64} className="rounded-full w-10 h-10"/>
					<div className="flex flex-col w-20 sm:w-44 h-10">
						<div className="h-full text-lg font-semibold items-center flex overflow-hidden w-full">
									<span className="w-full overflow-ellipsis whitespace-nowrap overflow-hidden">
										{friend.global_name}
									</span>
						</div>
						<span
							className="text-xs dark:text-gray-400 light:text-gray-500 hidden sm:block">Added: {timeAgo(friend.friendshipCreatedAt)}</span>
					</div>
				</CardBody>
			</Card>

			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				backdrop="opaque"
				size="xs"
				className="bg-gradient-to-br from-white to-default-300 dark:from-default-50 dark:to-black border border-default-200"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-row gap-4">
								<Avatar
									showFallback
									isBordered
									src={friend.image}
									radius="sm"
									aria-label="User in modal"
									className="flex-shrink-0"
								/>
								<div className="h-10 text-lg font-semibold items-center flex overflow-hidden w-fit">
									<span className="w-full overflow-ellipsis whitespace-nowrap overflow-hidden">
										{friend.global_name}
									</span>
								</div>
							</ModalHeader>
							<ModalFooter>
								<div className="flex flex-row content-around">
									<RemoveFriendButton session={session} user={friend} succesfull={() => {
										router.refresh();
										onClose();
									}}/>
								</div>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default FriendCard;