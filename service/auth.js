// const sessionIdToUserMap = new Map();
const jwt = require('jsonwebtoken');

const secret = "Yashraj@321"

function setUser(user){
    // sessionIdToUserMap.set(id,user);
   
    return jwt.sign(
        {
        _id:user._id,
        email: user.email,
        }
        ,secret);
}

function getUser(token){
    // sessionIdToUserMap.get(id);
    if(!token) return null;
    
    try{
        return jwt.verify(token,secret);
    }
    catch(error){
        return null;
    }
    
}


module.exports ={
    setUser,getUser,
}