(function(module) { //all projectView functions wrapped in an IIFE
  var projectView = {};

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

  projectView.footerStats = function() {
    $('.words').text(Project.wordCount());
    $('.lastMod').text(localStorage.last_mod);
  };

  projectView.pageRender = function() {
    Project.allProjects.forEach(function(projectObj) {
      $('#projects').append(projectObj.toHtml('#project-template'));
      if ($('#tag-filter option[value="' + projectObj.func + '"]').length === 0){
        $('#tag-filter').append(projectObj.toHtml('#tag-template'));
      }
    });
    projectView.handleFilter();
    projectView.expandContract();
    projectView.footerStats();
  };

  // Retrieve the json data
  Project.retrieveAll(projectView.pageRender);

  // IIFE module allows access to projectView methods
  module.projectView = projectView;
}(window));
