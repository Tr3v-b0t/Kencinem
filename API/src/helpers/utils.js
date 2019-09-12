import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
/**
 * Handles basic utilities like hashing passwords
 */
export default class Utils {
    static hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    }
    static serialize({
        name,
        email,
        verified,
        role,
        phoneNumber,
        token
    }) {
        return {
            name,
            email,
            phoneNumber,
            role,
            verified,
            token
        };
    }
    /**
     *
     * @param {*} email
     * @param {*} phoneNumber
     * @param {*} role
     */
    static createPayload(name,email, phoneNumber, role) {
        return {name, email, phoneNumber, role };
    }
    static encodeToken(user) {
        const token = jwt.sign({ user }, process.env.SECRET_KEY, {
            expiresIn: "2 days"
        });

        return token;
    }
}
