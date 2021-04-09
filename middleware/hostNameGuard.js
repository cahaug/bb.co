module.exports = (req, res, next) => {
    // check the hostname
    // see if its in the list
    const hostName = req.headers.origin
    let mySet = {
        //undefined:true,
	    'https://blackball.co':true,
    }
    if(hostName in mySet){
        console.log('valid host', hostName)
        next()
    } else {
        console.log('ban', hostName)
        res.status(400).json({message:'nahh, foo'})
    }

}