var projectView = {};

// projectView.populateFilters = function() {
//   $('article').not('.template').each(function() {
//
//   });
// };

projectView.handleNavbar = function() {
  $('#myNavbar .tab:first').on('click', function(e){
    e.preventDefault();
    $('.tab-content').hide().fadeIn();
  });
  $('#myNavbar .tab:gt(0)').on('click', function(e){
    e.preventDefault();
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
};

projectView.expandContract = function() {
  $('.caption p:nth-of-type(2)').hide();
  $('a.less').hide();
  $('#projects').on('click', 'a.more', function(e){
    e.preventDefault();
    $(this).parent().find('p').show();
    $(this).hide();
    $(this).parent().find('a.less').show();
  });
  $('#projects').on('click', 'a.less', function(e){
    e.preventDefault();
    $(this).parent().find('p:nth-of-type(2)').hide();
    $(this).hide();
    $(this).parent().find('a.more').show();
  });
};

projectView.handleNavbar();
projectView.expandContract();
