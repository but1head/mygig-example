import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router-dom';
import PhoneInput, { mask } from './components/PhoneInput';
import CodeResender from './components/CodeResender';
import api from 'controllers/Api';
import { FormErrorHandler } from 'utils/Helpers';
import UserController from 'controllers/User';

class Login extends Component {

  state = {
    isLoading: false,
    errors: null,
    isShowChallenge: false,
  }

  FormErrorHandler = FormErrorHandler.bind(this);

  onSubmit = (values) => {
    const { isShowChallenge } = this.state;

    // phone validation
    if(!values.phone || values.phone.includes('_')) {
      this.setState({ errors: [ `Введите телефон в формате: \n${mask}` ]});
      return;
    }

    // show spinner & reset errors
    this.setState({ isLoading: true, errors: null });

    if(!isShowChallenge) {
      // request challenge
      api.post(`/v1/user/login`, values)
      .then(response => {
        this.setState({
          isShowChallenge: true,
          isLoading: false,
        });
      })
      .catch(this.FormErrorHandler);
    } else {
      // submit challenge
      api.post(`/v1/user/login`, values)
      .then(response => {
        UserController.onLogin(response.data);
      })
      .catch(this.FormErrorHandler);
    }
  }

  requestNewChallenge = () => {

  }


  render() {
    const { errors, isLoading, isShowChallenge } = this.state;
    return (
      <Formik
        onSubmit={this.onSubmit}
        values={{ phone: '' }}>
        {({ errors: _errors, touched }) => (
          <Form className="form-signin">
            <h3 className="mb-4">Login</h3>
            {errors && <div className="alert alert-danger">{errors}</div>}
            <div className="form-group mb-4">
              <label>Phone</label>
              <PhoneInput name="phone" disabled={isLoading || isShowChallenge} />
            </div>
            {isShowChallenge && (
              <div className="form-group mb-4">
                <label>Secret code</label>
                <Field name="code" className="form-control" required />
                <small className="form-text text-muted">We sent you a code via SMS. <CodeResender /></small>
              </div>
            )}
            <button className="btn btn-lg btn-primary btn-block" disabled={isLoading}>
              {isLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Login'}
            </button>
            <br />
            <br />
            <br />
            <strong>root</strong>: +7 (111) 111 11 11
            <br /><strong>user</strong>: +7 (222) 222 22 22
            <br /><strong>admin</strong>: +7 (333) 333 33 33
            <br />
            <br /><div>secret code: <strong>Y5F1</strong> or <strong>FMJ3</strong></div>
          </Form>
        )}
      </Formik>
    );
  }

}

export default withRouter(Login);
