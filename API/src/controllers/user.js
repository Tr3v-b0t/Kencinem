import db from "../models";
import UserServices from "../services/user.js";
import Utils from "../helpers/utils";
const { hashPassword, encodeToken, createPayload } = Utils;

import Res from "../helpers/responses";
export default class userControllers {
    static async signUp(req, res) {
        const newUser = req.body;
        const { email } = newUser;
        const user = await UserServices.findByEmail(email);
        if (!user) {
            const hashedPassword = hashPassword(newUser.password);
            try {
                const token = encodeToken(
                    createPayload(
                        newUser.phoneNumber,
                        newUser.email,
                        newUser.role
                    )
                );
                const user = await db.users.create({
                    ...newUser,
                    password: hashedPassword,
                    temporaryToken: token
                });
                user.token = token;
                return Res.handleSuccess(
                    201,
                    "User registered successfully",
                    user,
                    res
                );
            } catch (error) {
                return Res.handleError(500, error.toString(), res);
            }
        } else {
            return Res.handleError(
                409,
                `user with ${email} already exists please login`,
                res
            );
        }
    }
}
