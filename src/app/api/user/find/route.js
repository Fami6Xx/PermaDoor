import {findUsers} from "@/lib/friends";
import {NextResponse} from "next/server";

export async function GET(request){
	const {searchParams} = new URL(request.url);
	const query = searchParams.get("query");
	const currentUserId = searchParams.get("currentUserId");

	return NextResponse.json(await findUsers(query, currentUserId));
}