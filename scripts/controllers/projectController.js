(function(module){
  var projectController = {};

  projectController.reveal = function() {
    $('.tab-content').hide();
    $('#projects').fadeIn();
  };

  module.projectController = projectController;
}(window));
