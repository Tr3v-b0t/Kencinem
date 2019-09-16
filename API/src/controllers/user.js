import jwt from "jsonwebtoken";
import db from "../models";
import UserServices from "../services/user.js";
import Utils from "../helpers/utils";
import Mailer from "../helpers/mailer";
const { hashPassword, encodeToken, createPayload } = Utils;
const { serialize } = Utils;
import Res from "../helpers/responses";
export default class userControllers {
    static async signUp(req, res) {
        const newUser = req.body;
        const { email, password } = newUser;
        const user = await UserServices.findByEmail(email);
        if (!user) {
            const hashedPassword = hashPassword(password);
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
                const tokenLink = `http://localhost:3000/api/v1/auth/verify?token=${token}`;
                await Mailer(email, tokenLink);
                user.token = token;
                return Res.handleSuccess(
                    201,
                    "User registered successfully",
                    serialize(user),
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
    static async verifyAccount(req, res) {
        const { token } = req.query;
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await UserServices.findByEmail(decoded.user.email);
            if (!user.verified) {
                db.users.update(
                    {
                        verified: true
                    },
                    { where: { email: decoded.user.email } }
                );
                return Res.handleSuccess(
                    200,
                    "yaaay you have been verified please proceed to log in !!!",
                    serialize(user),
                    res
                );
            }

            return Res.handleError(
                409,
                "you are already verified please login to proceed !!!",
                res
            );
        } catch (error) {
            return Res.handleError(
                401,
                "User verification failed please try again ",
                res
            );
        }
    }
}
