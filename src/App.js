import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <div id="page_contents">
        
          <h1 id="pageTitle">Github Pages WebApp</h1>
          <div id="basicGitHubUserDataContainer">
          </div>

          <div>
            <input type="text" name="textInputForGitHubUserName" id="inputGitHubUserField" placeholder="" />
          </div>

          <div>
            <a href="#" id="basicDataButton" className="queryButton">Basic User Data</a>
            <a href="#" id="GitHubPagesButton" className="queryButton">GH-Pages</a>
            <a href="#" id="resetButton" className="queryButton">Reset Page</a>
          </div>

        <br />
  
        <div id="githubAPIdata">
        </div>

        <div id="githubPagesData" className="repolist clearfix">
        </div>
      
        </div>

        <a href="pgs/index.html" className="back_page_link" target="_blank">*</a>
      </div>
    );
  }
}

export default App;
