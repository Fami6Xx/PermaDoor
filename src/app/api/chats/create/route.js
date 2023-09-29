import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {NextResponse} from "next/server";
import {getUserFriendsInfoById} from "@/lib/friends";
import {createConversation} from "@/lib/converstation";

/**
 * @param request {Request}
 */
export async function POST(request) {
	const requestJSON = await request.json();

	// Check if user is authorized to do this
	const session = await getServerSession(authOptions);
	if(!session || !requestJSON.userId || requestJSON.userId !== session.user.id){
		return NextResponse.json({status: 401, error: "You are not authorized to do this"});
	}

	// Check if user is friends with the selected users
	const desiredFriends = requestJSON.users;

	if(!desiredFriends || desiredFriends.length === 0){
		return NextResponse.json({status: 400, error: "You must select at least one user"});
	}

	const currentFriends = await getUserFriendsInfoById(session.user.id);
	const currentFriendsIds = currentFriends.map((friend) => friend.id);

	const isFriends = desiredFriends.every((friend) => currentFriendsIds.includes(friend));
	console.log(isFriends);
	if(!isFriends){
		return NextResponse.json({status: 400, error: "You are not friends with the selected users"});
	}

	// Create conversation
	const conversation = await createConversation(session.user.id, desiredFriends, requestJSON.name);
	console.log(conversation);

	return NextResponse.json({status: 200, message: "Conversation created"});
}