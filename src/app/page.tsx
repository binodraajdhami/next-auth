import NavBar from "@/component/NavBar";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
	const session = await getServerSession(authOptions);
	return (
		<div>
			<NavBar />
			<h1>Hello {session && session.user!.name}</h1>
		</div>
	);
}
