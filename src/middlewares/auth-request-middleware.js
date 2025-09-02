import passport from "passport";

export const authenticate = (req, res, next) => {
    passport.authenticate('jwt',(err,user) => {
        if(err || !user){
            return res.status(401).json({
                message: 'Unauthorized Access'
            });
        }
        req.user = user;
        next();
    })(req, res, next);
}