import { Result } from '../../../bin/generated/core/Result';
import { isSuccess } from './isSuccess';
const Fly = require('flyio/dist/npm/wx');
const flyio = new Fly();

/**
 * Request content using the new Fetch API. This is the default API that is used and
 * is create for all JSON, XML and text objects. However it is limited to UTF-8.
 * This is a problem for some of the Docs content, since that requires UTF-16!
 * @param url The url to request.
 * @param request The request object, containing method, headers, body, etc.
 */
export async function requestUsingFlyIOWX(url: string, request: Readonly<RequestInit>): Promise<Result> {
    // Fetch response using fetch API.
    const response = await flyio.request(url, request.body, {
        headers: request.headers,
        method: request.method,
    });

    // Create result object.
    return {
        url,
        ok: isSuccess(response.engine.status),
        status: response.engine.status,
        statusText: response.engine.statusText,
        body: response.data,
    };
}
