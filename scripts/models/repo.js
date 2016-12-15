(function(module) {
  var repos = {};

  repos.allRepos = [];
  repos.followers = [];
  repos.requestRepos = function(callback) {
    $.ajax({
      url: 'https://api.github.com/users/jjron/repos',
      type: 'GET',
      headers: {
        'Authorization': 'token ' + githubToken
      },
      success: function(data) {
        repos.allRepos = data;
        callback();
      }
    });
    $.ajax({
      url: 'https://api.github.com/users/jjron/followers',
      type: 'GET',
      headers: {
        'Authorization': 'token ' + githubToken
      },
      success: function(data) {
        repos.followers = data;
        callback();
      }
    });
  };

  /* Filters repos by a specific attribute */
  repos.withTheAttribute = function(myAttr) {
    return repos.allRepos.filter(function(someRepo){
      return someRepo[myAttr];
    });
  };

  module.repos = repos;
}(window));
