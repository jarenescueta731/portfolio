var projects = [];

// Constructor that takes source data from devProjects.js and creates a
// new Project object instance
function Project (obj) {
  this.projectUrl = obj.projectUrl;
  this.title = obj.title;
  this.func = obj.func;
  this.imgSrc = obj.imgSrc;
  this.imgAlt = obj.imgAlt;
  this.datePublished = obj.datePublished;
  this.caption = obj.caption;
};

// "Fills" a Handlebars.js template for each object in the devProjects array
Project.prototype.toHtml = function() {
  // calculates how many days ago the project was last published on GitHub
  this.pubDays = parseInt((new Date() - new Date(this.datePublished))/60/60/24/1000);
  this.pubStat = this.datePublished ? 'Published ' + this.pubDays + ' days ago' : '(draft)';
  // compile the template from index.html
  var $frame = $('#project-template').html();
  var theTemplate = Handlebars.compile($frame);
  return theTemplate(this);
};

// Sort projects by most recently published
devProjects.sort(function(currentObject, nextObject) {
  return (new Date(nextObject.datePublished)) - (new Date(currentObject.datePublished));
});

// Push each object in devProjects array to projects array
devProjects.forEach(function(projectObj) {
  projects.push(new Project(projectObj));
});

// Appends each data-filled projectObj to the section with the #projects ID
projects.forEach(function(projectObj) {
  $('#projects').append(projectObj.toHtml());
});
