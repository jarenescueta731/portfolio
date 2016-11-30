var projects = [];

// Constructor that takes source data from devProjects.js and creates a
// new Project object instance
function Project (obj) {
  this.projectUrl = obj.projectUrl;
  this.title = obj.title;
  this.imgSrc = obj.imgSrc;
  this.imgAlt = obj.imgAlt;
  this.datePublished = obj.datePublished;
  this.caption = obj.caption;
};

// Creates a clone of the empty template in index.html and fills it with the
// data just taken from devProjects.js
Project.prototype.toHtml = function() {
  var $newProject = $('article.template').clone();
  $newProject.find('a[href]').attr('href', this.projectUrl);
  $newProject.find('h4').text(this.title);
  $newProject.find('img').attr({src: this.imgSrc, alt: this.imgAlt});
  $newProject.find('p[class]').text(this.caption);
  $newProject.find('time[pubdate]').attr('title', this.datePublished);
  // calculates how many days ago the project was last published on GitHub
  $newProject.find('time').text('about ' + parseInt((new Date() - new Date(this.datePublished))/60/60/24/1000) + ' days ago');
  $newProject.removeClass('template');
  return $newProject;
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
