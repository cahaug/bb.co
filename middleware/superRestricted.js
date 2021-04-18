module.exports = (req, res, next) => {
    const authCode = req.headers.öäållåюячгфывацуфвшвызфыдюябчтсшыжтжйö.bin
    const allowedIPs = {
        '10.110.0.4':true,//local4tinyBuntuAmsterdam
        '157.245.70.192':true,//absolute4tinyBuntuAmsterdam
    }
    if(authCode === '1234' && req.headers['x-forwarded-for'] in allowedIPs){
        console.log('superRestricted Approve', req.headers['x-forwarded-for'])
        next()
    }else{
        console.log('ban superRestrict', req.headers['x-forwarded-for'])
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from('<img src="https://i.kym-cdn.com/photos/images/newsfeed/001/176/251/4d7.png" alt="nice try, hackerman" />'));
    }
}