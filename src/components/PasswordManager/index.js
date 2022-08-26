import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    passwordList: [],
    websiteInput: '',
    passwordInput: '',
    usernameInput: '',
    changeInput: '',
    isClicked: false,
  }

  buttonClicked = () => {
    this.setState(prevState => ({
      isClicked: !prevState.isClicked,
    }))
  }

  onChangeInput = event => {
    this.setState({changeInput: event.target.value})
  }

  deletePassword = passwordId => {
    const {passwordList} = this.state

    this.setState({
      passwordList: passwordList.filter(password => password.id !== passwordId),
    })
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newPassword = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      intialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  renderFormContainer = () => {
    const {websiteInput, usernameInput, passwordInput} = this.state

    return (
      <div className="form-container">
        <form className="form" onSubmit={this.onAddPassword}>
          <h1 className="form-heading">Add New Password</h1>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
              className="app-logo"
            />
            <input
              type="text"
              className="input"
              placeholder="Enter Website"
              value={websiteInput}
              onChange={this.onChangeWebsite}
            />
          </div>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
              className="app-logo"
            />
            <input
              type="text"
              className="input"
              placeholder="Enter UserName"
              value={usernameInput}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
              className="app-logo"
            />

            <input
              type="password"
              className="input"
              placeholder="Enter Password"
              value={passwordInput}
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="add-button">
            Add
          </button>
        </form>
      </div>
    )
  }

  renderPasswordContainer = () => {
    const {passwordList, changeInput} = this.state
    const searchResults = passwordList.filter(eachUser =>
      eachUser.website.toLowerCase().includes(changeInput.toLowerCase()),
    )
    if (searchResults.length !== 0) {
      return (
        <div className="password-list-container">
          <ul className="password-list">
            {searchResults.map(eachItem => (
              <PasswordItem
                key={eachItem.id}
                passwordDetails={eachItem}
                deletePassword={this.deletePassword}
                buttonClicked={this.buttonClicked}
              />
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div className="password-list-container-two">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="no-password-img"
        />
        <p className="password-text">No Passwords</p>
      </div>
    )
  }

  render() {
    const {passwordList} = this.state

    return (
      <div className="app-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo"
          />
          <div className="top-card-container">
            {this.renderFormContainer()}
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-img"
            />
          </div>
          <div className="down-card-container">
            <div className="password-logo">
              <h1 className="password-text">
                Your Passwords
                <p className="inner">{passwordList.length}</p>
              </h1>
              <div className="search-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="app-logo"
                />
                <input
                  type="search"
                  placeholder="Search"
                  className="input"
                  onChange={this.onChangeInput}
                />
              </div>
            </div>
            <hr className="line" />
            <div className="check-box-container">
              <button
                type="button"
                className="button"
                onClick={this.buttonClicked}
              >
                <input type="checkbox" id="password" />
              </button>
              <label className="checkbox-head" htmlFor="password">
                Show Passwords
              </label>
            </div>
            {this.renderPasswordContainer()}
          </div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
