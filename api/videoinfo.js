const innertube = require('youtubei.js').Innertube;
const clients = require('youtubei.js').Clients;

module.exports = async (req, res) => {
    let video_id = req.query.id;
    if (!video_id) { res.send({ err: true }); return; }

    const youtube = await innertube.create({
        // fetch: async (input, init) => {
        //     const url = typeof input === 'string'
        //         ? new URL(input)
        //         : input instanceof URL
        //             ? input
        //             : new URL(input.url);

        //     // Transform the url for use with our proxy.
        //     url.searchParams.set('__host', url.host);
        //     url.host = 'interesting-goat-87.deno.dev';
        //     url.protocol = 'https';

        //     const headers = init?.headers
        //         ? new Headers(init.headers)
        //         : input instanceof Request
        //             ? input.headers
        //             : new Headers();

        //     // Now serialize the headers.
        //     url.searchParams.set('__headers', JSON.stringify([...headers]));

        //     if (input instanceof Request) {
        //         // @ts-ignore
        //         input.duplex = 'half';
        //     }

        //     // Copy over the request.
        //     const request = new Request(
        //         url,
        //         input instanceof Request ? input : undefined,
        //     );

        //     headers.delete('user-agent');

        //     return fetch(request, init ? {
        //         ...init,
        //         headers
        //     } : {
        //         headers
        //     });
        // },
    });
    response = await youtube.getBasicInfo(video_id);

    dash = await response.toDash(url => {
        return `https://interesting-goat-87.deno.dev?__host=${url}`;
    });
    url = 'data:application/dash+xml;charset=utf-8;base64,' + btoa(dash);
    response.streaming_data.dash = url;

    res.send(response);
}