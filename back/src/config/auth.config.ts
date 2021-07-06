import jwt from 'jsonwebtoken';

/**
 * Vérifie que le token est valide.
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const verifyToken = (req, res, next) => {
    const token = req.header("token");
    if (!token) return res.status(401).json({ message: "User's not authenticated" });

    try {
        const decoded = jwt.verify(token, "randomString");
        req.user = decoded.user;
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Invalid Token" });
    }
};