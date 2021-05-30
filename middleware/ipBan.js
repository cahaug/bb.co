module.exports = (req, res, next) => {
    //check ip, see if banned, if not, allow thru
    let chichas = {
        '127.0.0.1':true,
    }
    if(req.headers['x-forwarded-for'] in chichas){
        console.log('bitchassfoo', req.headers['x-forwarded-for'])
        return res.status(400).json({message:'hey, fuck you, ur banned'})
    } else {
        console.log('ipBan Checked', req.headers['x-forwarded-for'])
        next()
    }
}