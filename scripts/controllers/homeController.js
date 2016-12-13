(function(module){
  var homeController = {};

  homeController.reveal = function() {
    $('.tab-content').hide().fadeIn();
  };

  module.homeController = homeController;
}(window));
