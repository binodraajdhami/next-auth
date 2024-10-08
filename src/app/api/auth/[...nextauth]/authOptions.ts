import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../../prisma/PrismaClient";
import bcrypt from "bcrypt";

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "Email" },
				password: {
					label: "Password",
					type: "password",
					placeholder: "password",
				},
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password) return null;

				// Await the result of the Prisma query
				const user = await prisma.user.findUnique({
					where: {
						email: credentials?.email,
					},
				});

				if (!user) return null;

				// Compare the password using bcrypt
				const passwordMatch = await bcrypt.compare(
					credentials?.password,
					user.password! // No need for non-null assertion here
				);

				return passwordMatch ? user : null;
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
};
