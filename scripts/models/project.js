(function(module) { // all Project functions wrapped in an IIFE
  /* Constructor that will take parsed data from devProjects.json and create
    new Project object instances*/
  function Project (obj) {
    Object.keys(obj).map(function(prop) {
      return this[prop] = obj[prop];
    }, this);
  };

  // Constructor function property that tracks the new objects and their key:value pairs
  Project.allProjects = [];

  // "Fills" a Handlebars.js template for each object in the devProjects array
  Project.prototype.toHtml = function(templateId) {
    var theTemplate = Handlebars.compile($(templateId).text());
    // calculates how many days ago the project was last published on GitHub
    this.pubDays = parseInt((new Date() - new Date(this.datePublished))/60/60/24/1000);
    this.pubStat = this.datePublished ? 'Published ' + this.pubDays + ' days ago' : '(draft)';
    // compile the template from index.html
    return theTemplate(this);
  };

  /* Sorts projects by most recently published;
    also refactored the forEach method to use .map() instead*/
  Project.loadAll = function(devProjectsInput) {
    Project.allProjects = devProjectsInput.sort(function(currentObject, nextObject) {
      return (new Date(nextObject.datePublished)) - (new Date(currentObject.datePublished));
    })
    .map(function(projectObj) {
      return new Project(projectObj);
    });
  };

  /* Retrieve that data from either localStorage or a remote source, process it,
    then call a function that renders the page */
  Project.retrieveAll = function(nextFunction) {
    if (localStorage.devProjects) {
      $.ajax({
        url: 'data/devProjects.json',
        type: 'HEAD',
        success: function(data, textStatus, jqXHR){
          var lastMod = jqXHR.getResponseHeader('Last-Modified');
          if (!localStorage.last_mod || lastMod !== localStorage.last_mod) {
            Project.getAll(nextFunction);
          } else {
            Project.loadAll(JSON.parse(localStorage.devProjects));
            nextFunction();
          }
        }
      });
    } else {
      Project.getAll(nextFunction);
    }
  };

  // Separate getJSON function for added readability
  Project.getAll = function(nextFunction) {
    $.getJSON('data/devProjects.json', function(data,textStatus, jqXHR){
      localStorage.last_mod = jqXHR.getResponseHeader('Last-Modified');
      Project.loadAll(data);
      localStorage.devProjects = JSON.stringify(data);
      nextFunction();
    });
  };

  /* Uses map and reduce methods to get the total word count of all
    project descriptions */
  Project.wordCount = function() {
    return Project.allProjects.map(function(article) {
      return article.caption.split(' ').length;
    }).reduce(function(a, b) {
      return a + b;
    });
  };

  // IIFE module that allows access to Project methods
  module.Project = Project;
}(window));
