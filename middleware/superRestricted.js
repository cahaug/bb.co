module.exports = (req, res, next) => {
    const authCode = req.headers.öäållåюячгфывацуфвшвызфыдюябчтсшыжтжйö.bin
    if(authCode === '1234'){
        console.log('superRestricted Approve', req.headers['x-forwarded-for'])
        next()
    }else{
        console.log('ban superRestrict', hostName)
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from('<img src="https://i.kym-cdn.com/photos/images/newsfeed/001/176/251/4d7.png" alt="nice try, hackerman" />'));
    }
}