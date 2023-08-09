import {findUsers} from "@/lib/friends";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function GET(request){
	const {searchParams} = new URL(request.url);
	const query = searchParams.get("query");
	const currentUserId = searchParams.get("currentUserId");
	const session = await getServerSession(authOptions);
	if(!session){
		return NextResponse.json({status: 401, error: "You are not authorized to do this"});
	}
	if(session.user.id !== currentUserId){
		return NextResponse.json({status: 401, error: "You are not authorized to do this"});
	}

	return NextResponse.json(await findUsers(query, currentUserId));
}