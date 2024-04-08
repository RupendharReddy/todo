const jwt = require('jsonwebtoken')

module.exports= function(req,res,next)
{
    try { 
        let token=req.headers.authorization;
        
        jwt.verify(token.split(" ")[1],'secretkey',(err,decoded)=>{
            if(err)
            {
                return res.status(403).json({ message: 'Forbidden: Invalid token' });
            }
            req.body.
            id=decoded.id
            next();
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("error in middleware catch")
    }
}
