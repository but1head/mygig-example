const Helpers = {};

export default Helpers;

export function FormErrorHandler (e) {
  const errors = [];
  if(e && e.response) {
    if(e.response.data && e.response.data.message) {
      if(!Array.isArray(e.response.data.message)) {
        e.response.data.message = [{ message: e.response.data.message }];
      }
      e.response.data.message.forEach(error => {
        errors.push(error.message);
      })
    } else {
      switch (e.response.status) {
        case 401:
          errors.push('Unauthorized, try re-login');
          break;
        default:

      }
    }
  } else if(e && e.message) {
    errors.push(e.message);
  }

  this.setState({ isLoading: false, errors });
}
