const jwt = require('jsonwebtoken');

function generateToken(user) {
    // header payload and verify signature
    // payload -> username, id, department, expiration date
    // verify signature -> a secret
    // console.log(user);
    const payload = {
        имя: user.имя,
        потребительИД: user.потребительИД,
    };
    
    const options = {
        expiresIn: '10d',
    };
  
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = generateToken 