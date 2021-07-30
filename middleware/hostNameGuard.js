module.exports = (req, res, next) => {
    // check the hostname
    // see if its in the list
    const hostName = req.headers.origin
    let mySet = {
        undefined:true,
        'http://localhost':true,
	    'https://blackball.co':true,
    }
    if(hostName in mySet){
        console.log('valid host', hostName)
        next()
    } else {
        console.log('ban', hostName)
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from('<img src="https://i.kym-cdn.com/photos/images/newsfeed/001/176/251/4d7.png" alt="nice try, hackerman" />'));
    }

}