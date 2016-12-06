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

projectView.pageRender = function() {
  Project.allProjects.forEach(function(projectObj) {
    $('#projects').append(projectObj.toHtml('#project-template'));
    if ($('#tag-filter option[value="' + projectObj.func + '"]').length === 0){
      $('#tag-filter').append(projectObj.toHtml('#tag-template'));
    }
  });
  projectView.handleNavbar();
  projectView.handleFilter();
  projectView.expandContract();
};

// Retrieve the json data
Project.retrieveAll();
