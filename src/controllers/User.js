import store from 'reducers';
import { history } from 'controllers/Router';

const UserController = {

  onLogin: async (data) => {
    await store.dispatch({
      type: 'USER_SET_CURRENT',
      params: data,
    });
    history.push('/');
  },

  onSwitch: async (id) => {
    await store.dispatch({
      type: 'USER_SWITCH_CURRENT',
      params: {
        id: parseInt(id),
      }
    });
    history.push('/');
  },

  onLogout: () => {
    localStorage.removeItem('userState');
    document.location.pathname = '/';
  },
};

export default UserController;
