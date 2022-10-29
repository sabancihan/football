import { NextApiRequest, NextApiResponse } from "next/types"
import dbConnect from "../../../lib/mongoose"
import User from "../../../models/User"

//Register Post API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    
    await dbConnect()
    
    switch (method) {
        case 'POST':
        try {
            const user = await User.create(req.body) 
            res.status(201).json({ success: true, data: user })
        } catch (error) {
            res.status(400).json({ success: false })
        }
        break
        default:
        res.status(400).json({ success: false })
        break
    }}