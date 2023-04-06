import type { Request, Response, NextFunction } from 'express';

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

export default function(token: string) {
    return function(req: Request, res: Response, next: NextFunction): void {
        if (req.headers.authorization
            && req.headers.authorization.startsWith(prefix)
            && same_string(req.headers.authorization, token, prefix_len))
            next();
        else
            res.writeHead(401).end();
    }
}

export const v2 = (token: string) => (f: (req: Request, res: Response) => void) => (req: Request, res: Response) => {
    if (
        req.headers.authorization
        && req.headers.authorization.startsWith(prefix)
        && same_string(req.headers.authorization, token, prefix_len)
    )
        f(req, res);
    else
        res.writeHead(401).end();
}
