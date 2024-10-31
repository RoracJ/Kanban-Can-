import jwt from 'jsonwebtoken';
// Helper function to verify JWT using async/await
const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err || !decoded)
                return reject(err);
            resolve(decoded);
        });
    });
};
// Authenticate token middleware
const authenticateToken = async (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }
    try {
        // Await the token verification
        const user = await verifyToken(token, process.env.JWT_SECRET);
        // Attach user data to the request object
        req.user = user;
        return next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};
// Export as default
export default authenticateToken;
