import Res from "../helpers/responses";
export const checkAgent = (req, res, next) => {
  if (!req.user.isAgent === true) {
    return Res.handleError(
      403,
      "Only agents are allowed to perform this task",
      res
    );
  }
  next();
};
