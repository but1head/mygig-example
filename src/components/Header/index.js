import React, { PureComponent } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store from 'reducers';
import UserController from 'controllers/User';
import { history } from 'controllers/Router';

class Header extends PureComponent {

  state = {
    isOpenUserMenu: false,
  }

  componentDidMount = () => {
    history.listen( location => {
      const { isOpenUserMenu } = this.state
      if(isOpenUserMenu) {
        this.setState({ isOpenUserMenu: false });
      }
    });
  }


  toggleUserMenu = () => this.setState({ isOpenUserMenu: !this.state.isOpenUserMenu });

  switchAccount = async (e) => {
    const { id } = e.currentTarget.dataset;
    e.preventDefault();
    UserController.onSwitch(parseInt(id));
  }

  renderAccounts = () => {
    const { accounts, current } = this.props.user;
    return accounts.map(account => {
      const isActive = account.id === current.id ? 'active' : '';
      return (
        <div key={account.id}>
          <a href="#" className={isActive} data-id={account.id} onClick={this.switchAccount}>{account.name}</a>
        </div>
      );
    });
  }

  render() {
    const { isOpenUserMenu } = this.state;
    const showUserMenu = isOpenUserMenu ? 'show' : '';
    const { current } = this.props.user;

    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 className="my-0 mr-md-4 font-weight-normal">MyGig</h5>
        <nav className="my-0 mr-auto header__menu">
          <NavLink to="/" exact className="p-2 text-dark">Home</NavLink>
          <NavLink to="/app/user" className="p-2 text-dark">User</NavLink>
          <NavLink to="/app/admin" className="p-2 text-dark">Admin</NavLink>
          <NavLink to="/app/root" className="p-2 text-dark">Root</NavLink>
        </nav>
        {current ? (
          <div className={`dropdown ${showUserMenu}`} style={{ marginRight: 80 }}>
            <button className="btn btn-primary dropdown-toggle" onClick={this.toggleUserMenu}>
              {current.name}
            </button>
            <div className={`user__menu dropdown-menu ${showUserMenu}`} aria-labelledby="dropdownMenuButton">
              <div className="user__menu-accounts">
                {this.renderAccounts()}
                <div className="mt-2">
                  <Link to="/login">Add account</Link>
                </div>
              </div>
              <a href="#" onClick={UserController.onLogout}>Exit</a>
            </div>
          </div>
        ) : (
          <Link to="/login" className="btn btn-outline-primary" href="#">Login</Link>
        )}

      </div>
    );
  }
}

export default connect(state => ({ user: state.user }))(Header);
