import type * as http from 'http'

const prefix = 'Bearer '
const prefix_len = prefix.length;

function same_string(a: string, b: string, offset: number) {
    if (a.length !== b.length + offset)
        return false;
    for (let i = 0; i < b.length; i++)
        if (a[i + offset] !== b[i])
            return false;
    return true;
}

export default function(token: string, callback: (req: http.IncomingMessage, res: http.ServerResponse) => void) {
    return function(req: http.IncomingMessage, res: http.ServerResponse): void {
        if (req.headers.authorization
            && req.headers.authorization.startsWith(prefix)
            && same_string(req.headers.authorization, token, prefix_len))
            callback(req, res);
        else
            res.writeHead(401).end();
    }
}
