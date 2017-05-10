import React, {
  Component
}
from 'react';
import './App.css';

class PageHeader extends Component {
  render() {
    return (
      <h2>Github User Previewer WebApp!</h2>
      );
  }
}

function ActionButtons() {
  return (
    <div>
      <a href="#" id="basicDataButton" className="queryButton">Basic User Data</a>
      <a href="#" id="GitHubPagesButton" className="queryButton">GH-Pages</a>
      <a href="#" id="resetButton" className="queryButton">Reset Page</a>
    </div>
  );
}

function GitHubUserBasicInfoDiv() {
  return (
    <div id="basicGitHubUserDataContainer">
    </div>
  );
}

function GitHubUserApiData() {
  return (
    <div id="githubPagesData" className="repolist clearfix">
    </div>
  );
}

function BackPageLink() {
  return (
    <a href="pgs/index.html" className="back_page_link" target="_blank">*</a>
  );
}

function url_for_github_rate_limit() {
  return "https://api.github.com/rate_limit";
}

class TextInputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <div>
        <input type="text" name="textInputForGitHubUserName" id="inputGitHubUserField" value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  }
}

class GitHubAPIDataDiv extends React.Component {
  render() {
    return (
      <div id="apiCallsRemaining">Calls Remaining : <GitHubAPIRateLimit />
    </div>
    );
  }
}
class GitHubAPIRateLimit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestFailed: false
    };
  }

  componentDidMount() {
    fetch(url_for_github_rate_limit(this.props.username))
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed");
        }

        return response;
      })
      .then(data => data.json())
      .then(data => {
        this.setState({
          githubData: data
        });
      }, () => {
        this.setState({
          requestFailed: true
        });
      });
  }

  render() {

    if (this.state.requestFailed) return <span>Failed!</span>;
    if (!this.state.githubData) return <span>Loading...</span>;
    return <span>{this.state.githubData.rate.remaining}</span>;
  }
}

class AppContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_called: '',
      num_api_calls_remaining: -1
    };
  }

  render() {
    return (
      <div id="page_contents">
        <PageHeader />
        <GitHubUserBasicInfoDiv />
        <TextInputBox />
        <ActionButtons />
        <br />
        <GitHubAPIDataDiv />
        <GitHubUserApiData />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
      <AppContent />
      <BackPageLink />
    </div>
    );
  }
}

export default App;
