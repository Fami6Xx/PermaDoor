import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
export default async function Home() {
  return (
    <>
      <p>First site</p>
    </>
  )
}
