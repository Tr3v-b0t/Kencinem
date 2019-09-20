import jwt from "jsonwebtoken";
import db from "../models";
import UserServices from "../services/user.js";
import Utils from "../helpers/utils";
import { Mailer, ResetMail } from "../helpers/mailer";
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

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserServices.findByEmail(email);
            if (!user) return Res.handleError(
                    404,
                    "No user with such email, please try to signup",
                    res
                );

            const pass = await Utils.check(password, user.password)
            if (!pass) return Res.handleError(
                    401,
                    "Either email or password is invalid",
                    res
                );
            if (!user.verified) return Res.handleError(
                403,
                "Please verify your account",
                res
            );
            
            const token = encodeToken(
                createPayload(
                    user.phoneNumber,
                    user.email,
                    user.role
                )
            );

            return Res.handleSuccess(
                200,
                "signed in successful",
                token,
                res
            );

        } catch (error) {
            return Res.handleError(500, error.toString(), res);
        }
    }

    static async reset(req, res) {
        const { email } = req.body;
        try {
            const user = await UserServices.findByEmail(email);
            if (!user) return Res.handleError(
                    404,
                    "No user with such email, please try to signup",
                    res
                );
           
            const token = encodeToken(
                createPayload(
                    user.phoneNumber,
                    user.email,
                    user.role
                )
            );
            db.users.update(
                {
                    temporaryToken: token
                },
                { where: { email: user.email } }
            );
            const tokenLink = `http://localhost:3000/api/v1/auth/redirect?key=${token}`;
            await ResetMail(email, tokenLink);
            return Res.handleOk(
                200,
                "Check your email to reset password",
                res
            );
        } catch (error) {
            return Res.handleError(500, error.toString(), res);
        }
    }

    static async redirect(req, res) {
        try {
            const key = req.query['key'];
            console.log(key);
            const link = `http://localhost:3000/api/v1/auth/reset?key=${key}`;

            return Res.handleSuccess(
                200,
                "click the link below to reset password",
                link,
                res
            );
        } catch (error) {
            return Res.handleError(500, error.toString(), res);
        }
    }
}
