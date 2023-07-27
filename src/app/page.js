import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <p>First site</p>
    </>
  )
}
