import {Button} from "@nextui-org/button";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import Image from 'next/image'
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import PermaNav from "@/components/Navbar/PermaNav";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <PermaNav/>
    </>
  )
}
