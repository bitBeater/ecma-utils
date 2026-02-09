import { createServer } from 'http';
import assert from 'node:assert';
import { after, describe, it } from 'node:test';
import { RetryCallBack, http } from '@bitbeater/ecma-utils/http';

const serverResponse = 'Hello World';
const serverResponseDelay = 2000;
const server = createServer((_req, resp) => resp.end(serverResponse)).listen(1337);
const dellayedServer = createServer((_req, resp) => setTimeout(() => resp.end(serverResponse), serverResponseDelay)).listen(1338);

describe('net/http', () => {
    after(() => {
        server?.close()?.closeAllConnections();
        dellayedServer?.close()?.closeAllConnections();
    });

    it('response timeout', async () => {

        const timeout = 1000;
        let error: Error;



        const start = Date.now();
        try {
            const response = await (await http(`http://localhost:1338`, { timeout })).text();
            assert(false, `should throw timeout error ${response}`);
        } catch (e) {
            error = e as Error;
        }
        const end = Date.now();
        const reqDuration = end - start;

        assert(error instanceof Error, `error: ${error}`);
        assert(reqDuration >= timeout, `reqDuration: ${reqDuration} timeout: ${timeout}`);
        assert(reqDuration < serverResponseDelay, `reqDuration: ${reqDuration} serVerResponseDelay: ${serverResponseDelay}`);
    });



    it('response timeout in time', async () => {

        const timeout = 3000;

        let timer: NodeJS.Timeout | undefined = undefined;


        const start = Date.now();
        try {
            const resp = await (await http(`http://localhost:1338`, { timeout })).text();
            assert.equal(resp, 'Hello World');
        } catch (e) {
            assert(false, `shouln not throw errors ${e}`);
        }

        const end = Date.now();
        const reqDuration = end - start;


        assert(reqDuration < timeout, `reqDuration: ${reqDuration} timeout: ${timeout}`);
        assert(reqDuration >= serverResponseDelay, `reqDuration: ${reqDuration} serVerResponseDelay: ${serverResponseDelay}`);
        clearTimeout(timer);
    });

    it('retries callback', async context => {
        const server = createServer((_req, resp) => {
            retires++;
            resp.statusCode = 500;
            resp.end();
        }
        ).listen(1339);

        let retires = 0;
        let calledRetryCallback = false;
        const maxRetries = 3;




        const onRetry: RetryCallBack = (retryParams) => {
            assert(retryParams.error instanceof Error);
            assert(!!retryParams.request);
            assert(retryParams.response instanceof Response);
            assert.equal(retryParams?.retryCount, retires);
            calledRetryCallback = true;
        }


        try {
            await http(`http://localhost:1339`, { retry: { maxRetries, onRetry } });
        } catch (error) { }


        assert(calledRetryCallback);

        context.after(() => server?.close()?.closeAllConnections());

    });




    it('test simple get http', async () => {
        const resp = await (await http(`http://localhost:1337`)).text();

        assert.equal(resp, 'Hello World');
    });

    it('retries', async () => {

        let retires = 0;
        const maxRetries = 3;

        const server = createServer((_req, resp) => {
            retires++;
            resp.statusCode = 500;
            resp.end();
        }
        ).listen(1339);

        try {
            await http(`http://localhost:1339`, { retry: { maxRetries } });
        } catch (e) { }

        assert.equal(retires, maxRetries);
        server.close();
    });

    it('retries with timeout', async () => {

        let retires = 0;
        const maxRetries = 3;
        const retryDelay = 500;

        const server = createServer((_req, resp) => {
            retires++;
            resp.statusCode = 500;
            resp.end();
        }
        ).listen(1339);

        server.close();

        const startTime = Date.now();

        try {
            await http(`http://localhost:1339`, { retry: { maxRetries, retryDelay } });
        } catch (error) { }

        const endTime = Date.now();
        assert(endTime - startTime >= ((maxRetries - 1) * retryDelay));
    });
});

