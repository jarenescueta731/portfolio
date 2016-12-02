var projectView = {};

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

projectView.populateFilter = function() {
  $('article').not('.template').each(function() {
    var funcName = $(this).find('.pub p span').text();
    var optionTag = '<option value="' + funcName + '">' + funcName + '</option>';
    if ($('#tag-filter option[value="' + funcName + '"]').length === 0){
      $('#tag-filter').append(optionTag);
    }
  });
};

projectView.handleFilter = function() {
  $('#tag-filter').on('change', function(){
    if ($(this).val()) {
      $('article').hide();
      $('article[data-func="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
  });
};

projectView.handleNavbar();
projectView.expandContract();
projectView.populateFilter();
projectView.handleFilter();
