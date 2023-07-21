import {Button} from "@nextui-org/button";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import Image from 'next/image'
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import PermaNav from "@/components/Navbar/PermaNav";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if(session){
    return (
      <>
        <PermaNav/>
        <Button size="md" variant="ghost">Ehm hello</Button>
        <p>{session.user.name}</p>
        <Image width={64} height={64} src={session.user.image} alt="profilePic"/>
        <pre>{JSON.stringify(session)}</pre>
      </>
    )
  }else{
    redirect("/api/auth/signin")
  }
}
