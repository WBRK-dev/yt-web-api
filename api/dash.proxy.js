module.exports = async (req, res) => {
    if (req.method === 'OPTIONS') {
        let status = 200
        let headers = new Headers({
            
        })
        res.headers = headers;
        console.log(res);
        res.send();
        return ;
      }

    let url = req.query.host;
    if (!url) {res.status(500).send({err: true, message: "No url given. Please use host query."}); return;}

    let headers = {
        "origin": "https://www.youtube.com",
        "referer": "https://www.youtube.com/",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-goog-visitor-id, x-origin, x-youtube-client-version, Accept-Language, Range, Referer',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'true'
    };
    let reqHeaders = req.headers;
    let reqHeadersKeys = Object.keys(reqHeaders);

    reqHeadersKeys.forEach(key => {
        if (key !== "host" && key !== "origin" && key !== "referer") {
            headers[key] = reqHeaders[key];
        }
    });
    
    console.log(headers);

    let raw = await fetch(url, {
        method: "OPTIONS",
        headers: headers
    });

    console.log(raw.status, req.method, await raw.text());

    if (!(raw.status >= 200 && raw.status < 300)) {res.status(raw.status).send({err: true, status: raw.status, message: raw.statusText}); return;}
    
    let resp;
    try {
        resp = raw.body;    
    } catch (error) {
        console.log(error);
        res.send({err: true, message: error});
        return;
    }

    res.status(raw.status).send(resp);
}