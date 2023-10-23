module.exports = async (req, res) => {
    let video_id = req.query.id;
    if (!video_id) {res.send({err: true}); return;}

    
    



    res.send(response);
}