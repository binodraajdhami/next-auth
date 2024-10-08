import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const checkUserRole: string = "ADMIN";
	if (checkUserRole == "ADMIN") {
		return NextResponse.redirect(new URL("/admin/dashboard", request.url));
	}
	return NextResponse.redirect(new URL("/new-page", request.url));
}

export const config = {
	matcher: ["/admin/dashboard"],
};
