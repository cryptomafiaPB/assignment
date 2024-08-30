import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface access_token {
    accessToken: string
}

export const POST = async (req: Request) => {

    const { accessToken }: access_token = await req.json()
    try {
        const response = await axios.get(
            `https://graph.facebook.com/me/accounts?access_token=${accessToken}`
        );


        return new Response(JSON.stringify(response.data), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response("Error fetching /api/auth/facebook login data", { status: 500 })
    }
}