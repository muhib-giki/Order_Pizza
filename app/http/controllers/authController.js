function authController() {
  return {
    login(req, res) {
      res.render("auth/login");
    },
    register(req, res) {
      res.render("auth/register");
    },
  };
} //factory functions ==> object creational pattern, it returns object

module.exports = authController;
