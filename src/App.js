import './App.css';
import { config } from './Config';
import { PublicClientApplication } from '@azure/msal-browser';
import React, { Component } from 'react'
import { fetchMail } from './services/MailService';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isAuthenticated: false,
      user: {}
    };
    this.login = this.login.bind(this)

    this.publicClientApplication = new PublicClientApplication({
      auth: {
        clientId: config.appId,
        redirectUri: config.redirectUri,
        authority: config.authority
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true
      }
    });
  }

  async login() {
    try {
      this.publicClientApplication.loginPopup(
        {
          scopes: config.scopes,
          prompt: "select_account"
        }).then(response => {
          this.accessToken = response.accessToken
          fetchMail(this.accessToken)
        }).catch(err => {
          console.log(err)
        });
      this.setState({ isAuthenticated: true })
    }
    catch (err) {
      this.setState({
        isAuthenticated: false,
        user: {},
        error: err
      });
    }
  }

  logout() {
    this.publicClientApplication.logout();
  }

  render() {
    return (
      <>
        {this.state.isAuthenticated ? <p> Success </p> :
          <p>
            <button onClick={() => this.login()} >Login</button>
          </p>
        }
      </>
    )
  }
}

export default App;
