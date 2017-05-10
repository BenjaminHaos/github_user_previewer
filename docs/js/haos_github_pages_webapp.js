/* global $*/

var user_object;
var debug = false;

function dom_display_no_user_message(user_not_found) {
  if(debug){console.log("user_not_found : " + user_not_found)}
  
  var fullname = user_not_found;

  var innerHTML = "";
  innerHTML += '<div>';
    innerHTML += '<div id="basicGitHubUserData">';
      innerHTML += '<div id="queriedUsersAvatar">';
        innerHTML += '<img id="avatar_image" src="../img/octocat_sad.jpg" alt="' + fullname + '">';
      innerHTML += '</div>';
      innerHTML += '<div>';
      innerHTML += '<h2 id="userInfoHeading">';
        innerHTML += '<span  style="color:red;" id="queriedUsersNameOrHandle">' + fullname + '';
        innerHTML += '</span>';
      innerHTML += '</div>';
      innerHTML += '</h2>';
      innerHTML += '<div style="color:red;text-align: center;" id="queriedUsersRepoDataStats">';
        innerHTML += 'USER';
        innerHTML += '</br>';
        innerHTML += 'NOT';
        innerHTML += '</br>';
        innerHTML += 'FOUND';
        innerHTML += '</br>';
    innerHTML += '</div>';
  innerHTML += '</div>';
  innerHTML += '</br>';

  $('#basicGitHubUserDataContainer').html(innerHTML);
}

function dom_display_basic_user_info() {
  if (user_object===undefined){
    $('#basicGitHubUserDataContainer').html('');
    return;
  }
  
  $('#basicGitHubUserDataContainer').html('<div id="loader"><img src="gifs/loading.gif" alt="loading..."></div>');
  
  var fullname = user_object.name;
  var username = user_object.login;
  var users_email = user_object.email;

  if (fullname === undefined || fullname === null) {
    fullname = username;
  }

  if (users_email === "null") {
    users_email = user_object.html_url;
  }

  var innerHTML = "";
  innerHTML += '<div>';
    innerHTML += '<div id="basicGitHubUserData">';
      innerHTML += '<div id="queriedUsersAvatar">';
        innerHTML += '<a href="' + user_object.html_url + '" target="_blank">';
        innerHTML += '<img id="avatar_image" src="' + user_object.avatar_url + '" alt="' + fullname + '">';
        innerHTML += '</a>';
      innerHTML += '</div>';
      innerHTML += '<div>';
      innerHTML += '<h2 id="userInfoHeading">';
        innerHTML += '<span id="queriedUsersNameOrHandle">' + fullname + '';
          innerHTML += '<span id="queriedUsersContactInfo"><a id="queriedUsersContactInfo" href="' + user_object.email + '" target="_blank">';
            innerHTML += '(@' + username;
          innerHTML += ')</a>';
          innerHTML += '</span>';
        innerHTML += '</span>';
      innerHTML += '</div>';
      innerHTML += '</h2>';
      innerHTML += '<div id="queriedUsersRepoDataStats">';
        innerHTML += 'Public Repos : ' + user_object.public_repos;
        innerHTML += '</br>';
        innerHTML += 'Public Gists : ' + user_object.public_gists;
    innerHTML += '</div>';
  innerHTML += '</div>';
  innerHTML += '</br>';

  $('#basicGitHubUserDataContainer').html(innerHTML);
}

function dom_display_repos_and_stars_with_timeout(){
  $('#githubPagesData').html('<div id="loader"><img src="gifs/loading.gif" alt="loading..."></div>');
  setTimeout(function(){dom_display_users_repos_with_gh_pages_starred()}, 1000);
}

function dom_display_users_repos_with_gh_pages_starred() {
  if (user_object===undefined){
    $('#githubPagesData').html('');
    return;
  }
  $('#githubPagesData').html(make_github_pages_html_from_user_object());
}

function make_github_pages_html_from_user_object() {
  var return_html_string = "";
  return_html_string += "";
  return_html_string += '<div class="repolistRoundTwo">';
  for (var i = 0; i < user_object.repos_api_data.length; i++) {
    
    return_html_string += '<div class="landscape_inline">';
    
    if (user_object.repos_api_data[i].has_pages) {
      return_html_string += '<a class="repo_link repo_with_pages_link" href = "';
    } else {
      return_html_string += '<a class="repo_link repo_without_pages_link" href = "';
    }
    
    return_html_string += user_object.repos_api_data[i].html_url;
    return_html_string += '" target="_blank">';
    return_html_string += user_object.repos_api_data[i].name;
    return_html_string += '</a>';
    
    if (user_object.repos_api_data[i].has_pages) {
      return_html_string += '<a class="repo_pages_link" href = "';
      return_html_string += user_object.repos_api_data[i].repos_pages_url;
      return_html_string += '" target="_blank">';
      return_html_string += '<img class="gh_pages_link_icon" src="img/default_pages_icon.png" alt="gh-pages link">';
      return_html_string += '</a>';
    }
    return_html_string += "</div>";
  }
  return_html_string += "</ul>";
  return_html_string += "</div>";

  return return_html_string;
}

function clear_input_field() {
  document.getElementById('inputGitHubUserField').value = '';
}

function reset_dom() {
  clear_input_field();
  user_object=undefined;
  dom_display_basic_user_info();
  dom_display_users_repos_with_gh_pages_starred();
}

function handle_click(function_to_call) {
  var input_field_string;
  input_field_string = $('#inputGitHubUserField').val();

  if (!input_field_string && user_object===undefined) {
    if (debug){console.log("NO TEXT FIELD and NO USER OBJECT!")}
    return;
  }

  if (!input_field_string && user_object) {
    if (debug){console.log("NO TEXT FIELD and USER OBJECT!")}
    function_to_call();
    return;
  }

  if (debug){console.log("INPUT TO PARSE")}
  
  reset_dom();
  clear_input_field();
  
  user_object=undefined;

  var github_user_api_url = "https://api.github.com/users/" + input_field_string;

  requestJSON(github_user_api_url, function(json) {
    if (json.message == "Not Found") {
      user_object=undefined;
      dom_display_no_user_message(input_field_string);
    }
    else {
      user_object = json;

      var num_of_repos_to_call_for = user_object.public_repos;

      if (num_of_repos_to_call_for > 100) {
        num_of_repos_to_call_for = 100;
        console.log("MORE THAN 100 REPOS!");
      }

      var github_users_repos_api_string = user_object.repos_url;
      var pagination_concatination_string = "?per_page=" + num_of_repos_to_call_for;
      var url_to_call = github_users_repos_api_string + pagination_concatination_string;

      requestJSON(url_to_call, function(json_returned) {
        if (json_returned.message == "Not Found") {
          user_object.repos_api_data = json_returned;
        }
        else {
          user_object.repos_api_data = json_returned;
          
          for (var i = 0; i < user_object.repos_api_data.length; i++) {
            if (user_object.repos_api_data[i].has_pages) {
              var github_pages_url_string = "http://" + user_object.login + ".github.io/" + user_object.repos_api_data[i].name;
              user_object.repos_api_data[i].repos_pages_url = github_pages_url_string;
            }
          }
          function_to_call();
        }
      });
    }
  });
}

function console_output_user_object() {
  if (user_object) {
    console.log("* * * USER OBJECT START * * *");
    console.log(user_object);
    console.log("* * *  USER OBJECT END  * * *");
  } else {
    console.log("* * * NO USER OBJECT TO OUTPUT * * *");
  }
}

function requestJSON(url, callback) {
  $.ajax({
    url: url,
    complete: function(xhr) {
      callback.call(null, xhr.responseJSON);
    }
  });
}

// Button 1
$('#basicDataButton').on('click', function(wtf_is_this) {
  handle_click(dom_display_basic_user_info);
});

// Button 2
$('#GitHubPagesButton').on('click', function(wtf_is_this) {
  handle_click(dom_display_repos_and_stars_with_timeout);
});

// Button 3 : A basic reset on the app, clears default user.
$('#resetButton').on('click', function(wtf_is_this) {
  if (debug) {
    console_output_user_object();
    reset_dom();
  }
  else {
    reset_dom();
  }
});
