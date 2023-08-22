"use client";
import {Button} from "@nextui-org/button";
import {useRouter} from "next/navigation";

const AddFriendRouteButton = () => {
	const router = useRouter();

	return (
		<Button isIconOnly variant="faded" aria-label="Add friend" className="fixed bottom-8 right-8" onPress={() => router.push("/friends/add")}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
				<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
		</Button>
	);
};

export default AddFriendRouteButton;