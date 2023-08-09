import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {NextResponse} from "next/server";
import {acceptFriendRequest} from "@/lib/friends";

export async function  POST(request){
	const {senderId, receiverId} = await request.json();
	const session = await getServerSession(authOptions);
	if(!session){
		return NextResponse.json({status: 401, error: "You are not authorized to do this"});
	}
	if(session.user.id !== receiverId){
		return NextResponse.json({status: 401, error: "You are not authorized to do this"});
	}

	const result = await acceptFriendRequest(senderId, receiverId);

	if(result){
		return NextResponse.json({status: 200, message: "Friend request accepted"});
	}else{
		return NextResponse.json({status: 400, error: "Friend request failed"});
	}
}