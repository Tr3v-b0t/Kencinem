const userControllers = {
  async signUp(req, res) {
    res.status(200).send({
      message: "it worked"
    });
  }
};

export default userControllers
