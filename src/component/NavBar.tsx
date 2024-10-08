"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
	const { status, data: session } = useSession();
	return (
		<nav className="h-[50px] flex  items-center bg-blue-950">
			<div className="container">
				<ul className="flex justify-center items-center gap-5">
					<li>
						<Link href="/" className="text-white">
							Home
						</Link>
					</li>
					<li>
						<Link href="/admin/dashboard" className="text-white">
							Admin Dashboard
						</Link>
					</li>
					{status === "loading" ? (
						<p className="text-white">Loading...</p>
					) : (
						<>
							{status === "unauthenticated" ? (
								<li>
									<Link
										href="/api/auth/signin"
										className="text-white"
									>
										Sign In
									</Link>
								</li>
							) : (
								<>
									<li>
										<span className="text-white">
											{session?.user?.name}
										</span>
									</li>

									<li>
										<button
											onClick={() =>
												signOut({ callbackUrl: "/" })
											}
											className="text-white"
										>
											Sign Out
										</button>
									</li>
								</>
							)}
						</>
					)}
				</ul>
			</div>
		</nav>
	);
}
