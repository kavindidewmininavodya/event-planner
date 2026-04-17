import { NextRequest } from "next/server";


export default async function Proxy(requeest: NextRequest) {

    const {auth} = await import("@/lib/auth/server")
    return auth.middleware({loginUrl: "/auth/sign-in"})(requeest)
    
}