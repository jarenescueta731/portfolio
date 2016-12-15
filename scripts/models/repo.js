(function(module) {
  var repos = {};

  // Refactored $.ajax requests into $.get requests
  repos.requestRepos = function(callback) {
    $.when(
      $.get('/github/users/jjron/repos', function(data){
        repos.allRepos = data;
      }),
      $.get('/github/users/jjron/followers', function(data){
        repos.followers = data;
      })
    ).done(callback);
  };

  /* Filters repos by a specific attribute */
  repos.withTheAttribute = function(myAttr) {
    return repos.allRepos.filter(function(someRepo){
      return someRepo[myAttr];
    });
  };

  module.repos = repos;
}(window));
