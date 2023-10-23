const innertube = require('youtubei.js').Innertube;

module.exports = async (req, res) => {
    const youtube = await innertube.create();
    response = await youtube.getHomeFeed();
    res.send(response)
}