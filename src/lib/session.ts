import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.SECRET_KEY || "default-secret-key-change-me");

const cookie = {
    name: "session",
    options: {
        httpOnly: true,
        secure: true,
        sameSite: "lax" as const,
        path: "/",
    },
    duration: 24 * 60 * 60 * 1000, // 24 hours
};

export async function encrypt(payload: any) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1day")
        .sign(key);
}

export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export async function createSession(userId: string) {
    const expires = new Date(Date.now() + cookie.duration);
    const session = await encrypt({ userId, expires });

    const cookieStore = await cookies();
    cookieStore.set(cookie.name, session, { ...cookie.options, expires });
}

export async function verifySession() {
    const cookieStore = await cookies();
    const session = cookieStore.get(cookie.name)?.value;
    const payload = await decrypt(session);

    if (!payload?.userId) {
        redirect("/login");
    }

    return { userId: payload.userId };
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete(cookie.name);
    redirect("/login");
}
