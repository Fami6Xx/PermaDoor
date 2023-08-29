import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {NextResponse} from "next/server";
import {removeFriend} from "@/lib/friends";

export async function POST(request){
	const {userId, friendId} = await request.json();
	const session = await getServerSession(authOptions);
	if(!session){
		return NextResponse.json({status: 401, error: "You are not authorized to do this"});
	}
	if(session.user.id !== userId){
		return NextResponse.json({status: 401, error: "You are not authorized to do this"});
	}

	const result = await removeFriend(userId, friendId);

	if(result){
		return NextResponse.json({status: 200, message: "Friend removed"});
	}else{
		return NextResponse.json({status: 400, error: "Friend remove failed"});
	}
}