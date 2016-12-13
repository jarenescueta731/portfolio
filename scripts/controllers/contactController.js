(function(module){
  var contactController = {};

  contactController.reveal = function() {
    $('.tab-content').hide();
    $('#contact').fadeIn();
  };

  module.contactController = contactController;
}(window));
