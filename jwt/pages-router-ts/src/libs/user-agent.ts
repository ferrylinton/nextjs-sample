import { NextRequest } from 'next/server';
import parser from 'ua-parser-js';

export function getData(req: NextRequest) {
    try {
        return parser(req.headers.get('user-agent')!);
    } catch (error) {
        console.log(error);
    }

    return 'Unknown';
}