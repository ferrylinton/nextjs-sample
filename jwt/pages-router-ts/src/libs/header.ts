import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import parser from 'ua-parser-js';

export function getBrowserId(req: NextRequest) {
    return getAgent(req) + '#' + getIp(req);
}

export function getIp(req: NextRequest) {
    try {
        let ip = req.ip ?? req.headers.get('x-real-ip');
        if (ip) {
            return ip;
        }

        const forwardedFor = req.headers.get('x-forwarded-for')
        if (forwardedFor) {
            return forwardedFor.split(',').at(0) ?? 'Unknown';
        }
    } catch (error) {
        console.log(error);
    }

    return 'Unknown';
}

export function getIpFromApi(req: NextApiRequest) {
    try {
        let ip = req.headers["x-real-ip"];
        if (!ip) {
            const forwardedFor = req.headers["x-forwarded-for"];
            if (Array.isArray(forwardedFor)) {
                ip = forwardedFor.at(0);
            } else {
                ip = forwardedFor?.split(",").at(0) ?? "Unknown";
            }
        }
        return ip as string;
    } catch (error) {
        console.log(error);
    }

    return 'Unknown';
}

export function getAgent(req: NextRequest) {
    try {
        const userAgent = parser(req.headers.get('user-agent')!);
        if (userAgent.browser.name && userAgent.os.name) {
            return userAgent.browser.name + '#' + userAgent.os.name;
        }

        return userAgent.ua;
    } catch (error) {
        console.log(error);
    }

    return 'Unknown';
}