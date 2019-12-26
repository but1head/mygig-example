const state = localStorage.getItem('userState');
export const initialState = state ? JSON.parse(state) : {
  current: null,
  accounts: [],
};

export default (state = initialState, action) => {
  let nextState = state;
  switch (action.type) {

    case 'USER_SET_CURRENT':
      nextState = {
        ...state,
        current: action.params,
      };
      
      // add account if not exist, or switch to default
      const exist = nextState.accounts.find(account => account.id === nextState.current.id);
      if(!exist) nextState.accounts.push(action.params);
      localStorage.setItem('userState', JSON.stringify(nextState));
      break;

    case 'USER_SWITCH_CURRENT':
      const { id } = action.params;
      const current = nextState.accounts.find(account => account.id === id);
      if(!current) return state;
      nextState = { ...state, current };
      localStorage.setItem('userState', JSON.stringify(nextState));
      break;

    default:

  }

  return nextState;
}
