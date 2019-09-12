import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
/**
 * Handles basic utilities like hashing passwords
 */
export default class Utils {
    static hashPassword(password) {
        bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    }
    static serialize({
        firstname,
        lastname,
        email,
        isAgent,
        isAdmin,
        phoneNumber,
        token
    }) {
        return {
            firstname,
            lastname,
            email,
            isAgent,
            isAdmin,
            phoneNumber,
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
