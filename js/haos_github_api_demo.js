$('#basicDataButton').on('click', function(wtf_is_this) {
  update_dom();
});

function update_dom() {
  
  var user_dom_should_work_with = $('#ghusername').val();
  
  if (user_dom_should_work_with) {
    client_modded_default = true;
  }
  // manage the text input field.
  // if we have no text in the input field and no default set,"
  if (!user_dom_should_work_with && !default_username) {
    // the user has not set a GitHub user to query.
  }
  // else, if we have no text in the input field but a default is set,
  else if (!user_dom_should_work_with && default_username) {
    // we use the default;
    user_dom_should_work_with = default_username;
    // If it's the first load on the browser, do nothing.
    // If it's the second load and the original default has not been modded,
    if(num_of_actions_client_actioned == 1 && !client_modded_default)
      update_default_user(user_dom_should_work_with);
  }
  // else if we have text in the input field and a default already set,"
  else if (user_dom_should_work_with && default_username) {
    
    // We should see if there is any change and if there is,"
    if (!(user_dom_should_work_with === default_username)) {
      update_default_user(user_dom_should_work_with);
    } 
  }
  else {
    update_default_user(user_dom_should_work_with);
  }
  update_input_text_field(user_dom_should_work_with);

  update_api_calls_remain_view();
  num_of_actions_client_actioned++;
}

function update_default_user(user_dom_should_work_with){

  // update the global variable.
  default_username = user_dom_should_work_with;
  
  var basic_github_user_api_string = "https://api.github.com/users/";
  var url_to_call = basic_github_user_api_string + default_username;
  
  requestJSON(url_to_call, function(json) {
    if (json.message == "Not Found") {
      // ToDo need some error correction here!
    }
    else {
      default_user_object=json;
    }
  update_basic_user_data_view();
  });
}

function update_basic_user_data_view() {
  var fullname   = default_user_object.name;
  var username   = default_user_object.login;
  
  var users_email = default_user_object.email;
  if(fullname == undefined) { fullname = username; }
  
  
  if (users_email === null) {
    users_email = default_user_object.html_url;
  }
  
  var innerHTML = "";
  innerHTML += "<div>";
  innerHTML += "<h2>"+ default_user_object.name;
  
  innerHTML += '<span class="smallname">(@<a href="' + users_email + '" target="_blank">';
  innerHTML += default_user_object.name + '</a>)</span></h2>';
  innerHTML += '<div class="ghcontent">';
  innerHTML += '<div class="avi">';
  innerHTML += '<a href="' + default_user_object.html_url + '" target="_blank">';
  innerHTML += '<img src="' + default_user_object.avatar_url + '" width="80" height="80" alt="' + fullname + '"></a></div>';
  innerHTML += '<p>Public Repos : ' + default_user_object.public_repos + '</p>';
  innerHTML += '<p>Public Gists : ' + default_user_object.public_gists + '</p>';
  innerHTML += '</div></div><br></br>';

  $('#basicGitHubUSERdata').html(innerHTML);
}

function update_input_text_field(user_to_work_with) {
  if (user_to_work_with) {
    document.getElementsByName('ghusername')[0].placeholder='Enter a GitHub username here. Default : ' + user_to_work_with;
  } else {
    document.getElementsByName('ghusername')[0].placeholder='Enter a GitHub username here.';
  }
  clear_input_field();
}

function clear_input_field() {
  document.getElementById('ghusername').value='';
}

function update_api_calls_remain_view() {
  
  var github_rate_limit_url_string = 'https://api.github.com/rate_limit';
  
  requestJSON(github_rate_limit_url_string, function(json) {
  
    var basicGitHubAPIrateString = "NOT_SET";
    var error_string="update_dom() could not get github_rate_limit_url_string";
    
    if (json.message == "Not Found") {
      basicGitHubAPIrateString = error_string;
    }
    else {
      var calls_remain = json.resources.core.remaining;
      basicGitHubAPIrateString = "<p id=\"basicData\"> API calls remaining : " + calls_remain + " </p>";
    }
  $('#basicGitHubAPIdata').html(basicGitHubAPIrateString);
  });
}

function console_display_value(val_in) {
  console.log(val_in);
}

// This bit was copied and i still need to figure it out more fully.
// ToDo Figure this out!

function requestJSON(url, callback) {
  $.ajax({
    url: url,
    complete: function(xhr) {
      callback.call(null, xhr.responseJSON);
    }
  });
}

// A basic reset on the app, clears default user.
$('#resetButton').on('click', function(wtf_is_this) {
  location.reload();
});

var num_of_actions_client_actioned = 0;
var client_modded_default = false;
var default_username = "KoreaHaos";
var default_user_object;

update_dom();
