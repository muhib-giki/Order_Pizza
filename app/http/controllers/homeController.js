const Menu = require("../../models/menu");

function homeController() {
  return {
    index(req, res) {
      Menu.find().then(function(pizzas) {
        return res.render("home", { pizzas: pizzas });
      });
    },
  };
} //factory functions ==> object creational pattern, it returns object

module.exports = homeController;
