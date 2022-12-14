import { getToken } from "next-auth/jwt"
import { getCsrfToken, signOut } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils"
import { NextApiRequest, NextApiResponse } from "next/types"
import invariant from "tiny-invariant"
import dbConnect from "../../../lib/mongoose"
import Account from "../../../models/Account"
import Session from "../../../models/Session"
import User from "../../../models/User"
import VerificationToken from "../../../models/VerificationToken"

//Register Post API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const csrfToken = await getCsrfToken({ req })






 
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed" })
        return
    }

    const data = req.body


    
    if (data.csrfToken !== csrfToken) {
        return
    }


    

    //Connect to database

    const userInfo = await getToken({ req })

    if (!userInfo) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }


    invariant(userInfo.email, "Email cannot be empty")


    //ObjedtId of user
    const userId = userInfo.sub


    //transactional delete
    const session = await dbConnect().then(db => db.startSession())
    session.startTransaction()
    try {
        
        await Promise.all([
            User.deleteOne({ _id: userId }),
            Account.deleteOne({ userId }),
            Session.deleteMany({ userId }),
            VerificationToken.deleteMany({ identifier: userInfo.email })
        ])


        await session.commitTransaction()
        session.endSession()

    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        res.status(500).json({ message: "Internal Server Error" })
        return
    }

    
    








    res.setHeader("Set-Cookie", [

   
        "__Secure-next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; httponly; samesite=strict",
        "__Secure-next-auth.csrf-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; httponly; samesite=strict",
        "__Secure-next-auth.callback-url=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; httponly; samesite=strict",

        
        `next-auth.callback-url=${encodeURIComponent("/")}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        `next-auth.csrf-token=${encodeURIComponent("")}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        `next-auth.session-token=${encodeURIComponent("")}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        ])



    res.status(200).json({ message: "Success" })

  


}