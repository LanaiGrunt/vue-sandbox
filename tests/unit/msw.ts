import { setupServer } from 'msw/node';
import { ResponseComposition, rest, RestContext, RestRequest } from 'msw';

const defaultHandler = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    console.error(`Add missing handler for "${req.method} => ${req.url.href}"`);
    return res(ctx.status(500));
};

const server = setupServer(
    rest.head('*', defaultHandler),
    rest.get('*', defaultHandler),
    rest.post('*', defaultHandler),
    rest.put('*', defaultHandler),
    rest.patch('*', defaultHandler),
    rest.options('*', defaultHandler),
    rest.delete('*', defaultHandler),
);

export { server, rest };