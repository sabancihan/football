import { getToken } from "next-auth/jwt"
import { getCsrfToken } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils"
import { NextApiRequest, NextApiResponse } from "next/types"
import invariant from "tiny-invariant"
import dbConnect from "../../../lib/mongoose"
import Account from "../../../models/Account"
import Session from "../../../models/Session"
import User from "../../../models/User"

//Register Post API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const csrfToken = await getCsrfToken({ req })





 
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed" })
        return
    }

    const data = JSON.parse(req.body)

    
    if (data.csrfToken !== csrfToken) {
        return
    }


    

    //Connect to database
    await dbConnect()

    const userInfo = await getToken({ req })

    if (!userInfo) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }

    invariant(userInfo.email, "Email cannot be empty")


    await User.deleteOne({ email: userInfo.email })
    await Session.deleteMany({ userId: userInfo.email })
    await Account.deleteMany({ userId: userInfo.email })



    res.setHeader("Set-Cookie", [
        `next-auth.callback-url=${encodeURIComponent("/")}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        `next-auth.csrf-token=${encodeURIComponent("")}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        `next-auth.session-token=${encodeURIComponent("")}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        ])


    res.redirect(302, "/login")


}