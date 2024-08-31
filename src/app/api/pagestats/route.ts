import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export interface PageStatsAPI {

}

export const POST = async (req: Request) => {

    const { selectedPageId, accessToken, since, until, userId, period } = await req.json()
    console.log(selectedPageId, accessToken, userId, since, until, period)

    let pageAccessToken;
    try {
        const response = await axios.get(
            `https://graph.facebook.com/${userId}/accounts?access_token=${accessToken}`
        );
        pageAccessToken = response.data.data.find(
            (page: any) => page.id === selectedPageId
        ).access_token;

    } catch (error) {
        console.log("Cannot find page access token", error);
    }
    try {
        console.log(pageAccessToken)
        const response = await axios.get(
            `https://graph.facebook.com/${selectedPageId}/insights?metric=page_follows,page_post_engagements,page_views_total,page_fans&access_token=${pageAccessToken}&period${period}&since${since}&until${until}`
        );
        return new Response(JSON.stringify(response.data), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response("Error fetching /api/auth/facebook login data", { status: 500 })
    }
}