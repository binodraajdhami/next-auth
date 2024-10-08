import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import bcrypt from "bcrypt";
import prisma from "../../../../prisma/PrismaClient";

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(3),
});

export async function POST(request: NextRequest) {
	const body = await request.json();

	const validation = schema.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(
			{ error: validation.error?.errors },
			{ status: 400 }
		);
	}

	const user = await prisma.user.findUnique({
		where: {
			email: body.email,
		},
	});

	if (user) {
		return NextResponse.json(
			{ error: "Email is already exist!" },
			{ status: 400 }
		);
	}

	const hashedPassword = await bcrypt.hashSync(body.password, 10);
	const newUser = await prisma.user.create({
		data: {
			email: body.email,
			password: hashedPassword,
		},
	});

	return NextResponse.json({ user: newUser }, { status: 400 });
}
