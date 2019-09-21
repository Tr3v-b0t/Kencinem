import _ from 'lodash';
import jwt from "jsonwebtoken";
import Res from '../helpers/responses';
import Validate  from './validate';
import UserServices from "../services/user.js";
import Utils from "../helpers/utils";
import db from "../models";

const { hashPassword } = Utils;

const updatePassword = async (user, req, res) => {
    try {  
    Validate.resetPassword(req, res);
    const hashedPassword = hashPassword(req.body.password);
    db.users.update(
        {
            password: hashedPassword
        },
        { where: { email: user.email } }
    );

    return Res.handleOk(
        200,
        "password updated successful",
        res
    );
} catch (error) {
    return Res.handleError(500, error.toString(), res);  
}
}

const reset = async (req, res, next) => {
 try {
    const query = req.query;
    if(_.isEmpty(query) || req.body.email){
        Validate.reset(req, res);
        return next();
    }
    const key = Object.keys(query)[0];
    if (!_.includes(['key'], key.toLowerCase()) || query[key] == '') {
        return Res.handleError(400, `Invalid reset key`, res);
    }
    const token = query[key];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserServices.findByEmail(decoded.user.email);
    if (!user) return Res.handleError(
            400,
            "Invalid token please try again to reset password",
            res
        );
    
    await updatePassword(user, req, res);
 } catch (error) {
    return Res.handleError(500, error.toString(), res);
 }
}

export default reset;