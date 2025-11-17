import jwt from "jsonwebtoken";

export async function authTokenDecoder(authHeader) {
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Authorization token missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded.id;
}
