/* Constructor that will take parsed data from devProjects.json and create
  new Project object instances*/
function Project (obj) {
  for (var prop in obj) {
    this[prop] = obj[prop];
  }
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

/* Sort projects by most recently published and pushes them into
  the allProjects array */
Project.loadAll = function(devProjectsInput) {
  devProjectsInput.sort(function(currentObject, nextObject) {
    return (new Date(nextObject.datePublished)) - (new Date(currentObject.datePublished));
  })
  .forEach(function(projectObj) {
    Project.allProjects.push(new Project(projectObj));
  });
};

/* Retrieve that data from either localStorage or a remote source, process it,
  then call a function that renders the page */
Project.retrieveAll = function() {
  if (localStorage.devProjects) {
    var parsed = JSON.parse(localStorage.getItem('devProjects'));
    Project.loadAll(parsed);
    console.log('data cached in localStorage');
    projectView.pageRender();
  } else {
    $.getJSON('data/devProjects.json', function(data){
      Project.loadAll(data);
      localStorage.setItem('devProjects', JSON.stringify(data));
      console.log('data from downloaded file');
      projectView.pageRender();
    });
  }
};
