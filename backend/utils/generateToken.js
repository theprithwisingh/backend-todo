import jwt from "jsonwebtoken";

export async function generateToken(user) {
    return jwt.sign(
        {id:user.id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
}