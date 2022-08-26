import './index.css'

const PasswordItem = props => {
  const {passwordDetails, deletePassword, buttonClicked} = props
  const {website, username, password, id, intialClassName} = passwordDetails
  const intial = website ? website[0].toUpperCase() : ''

  const onCLickDelete = () => {
    deletePassword(id)
  }

  const isButtonClicked = buttonClicked
    ? {password}
    : 'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'

  return (
    <li className="lists-container">
      <div className="side">
        <div className={intialClassName}>
          <p className="intial">{intial}</p>
        </div>
        <div className="card">
          <p className="website1">{website}</p>
          <p className="website">{username}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars"
          />
        </div>
        <button
          className="button1"
          type="button"
          testid="delete"
          onClick={onCLickDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
            alt="delete"
            className="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default PasswordItem
