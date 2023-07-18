import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import {Avatar} from "@nextui-org/avatar";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const NavbarUser = async () => {
	const session = await getServerSession(authOptions);
	console.log(session);
	return (
		<Popover showArrow placement="bottom">
			<PopoverTrigger>
				<Avatar
					showFallback
					isBordered
					src={session.user.image}
					radius="sm"
					className="transition-transform"
				/>
			</PopoverTrigger>
			<PopoverContent>
				<p>Content</p>
			</PopoverContent>
		</Popover>
	);
};

export default NavbarUser;