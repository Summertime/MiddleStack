export const middlestack = (handlers) => async (req: Request) => {
    return await handlers.reduceRight(
        (prior, current) => current(prior),
        (req: Request) => new Response('404', { status: 404 }),
    )(req);
};

export const set_header = (key, value) => (next) => async (req: Request) => {
    const res = await next(req);
    res.headers.set(key, value);
    return res;
};

export const error_handler = () => (next) => async (req: Request) => {
    try {
        return await next(req);
    } catch {
        return new Response('Error', { status: 500 });
    }
};

export const route = (method, path, code) => (next) => async (req: Request) => {
    const pattern = new URLPattern(path, req.url);
    const match = pattern.exec(req.url);
    if (req.method === method && match !== null)
        return await code(req, match);
    return await next(req);
};
