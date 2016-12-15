(function(module){
  var repoView = {};

  var repoRender = Handlebars.compile($('#repo-template').html());
  var followerRender = Handlebars.compile($('#follower-template').html());
  repoView.renderRepos = function() {
    $('#about .projects').empty()
      .append(repos.withTheAttribute('name').map(repoRender)
    );
    $('#about .followers').empty()
      .append(repos.followers.map(followerRender)
    );
  };

  /* Request repo data before it gets rendered */
  repos.requestRepos(repoView.renderRepos);

}(window));
