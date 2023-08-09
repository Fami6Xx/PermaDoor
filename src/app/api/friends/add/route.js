import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {sendFriendRequest} from "@/lib/friends";

export async function POST(request) {
	const {userId, currentUserId} = await request.json();
	const session = await getServerSession(authOptions);
	if(!session){
		return NextResponse.json({status: 401, error: "You are not authorized to do this"});
	}
	if(session.user.id !== currentUserId){
		return NextResponse.json({status: 401, error: "You are not authorized to do this"});
	}

	const result = await sendFriendRequest(userId, currentUserId);

	if(result){
		return NextResponse.json({status: 200, message: "Friend request sent"});
	}else{
		return NextResponse.json({status: 400, error: "Friend request failed"});
	}
}