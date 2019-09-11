import bcrypt from "bcryptjs";

/**
 * Handles basic utilities like hashing passwords
 */
export default class Utils {
    static hashPassword = (password) =>
        bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}
