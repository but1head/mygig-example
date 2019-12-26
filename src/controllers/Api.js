import * as Cookies from 'js-cookie';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// fake db
const codes = ['y5f1', 'fmj3'];
const users = [
  {
    id: 1,
    role: 'root',
    name: 'root user',
    phone: '+7 (111) 111 11 11',
    token: `wefb53mfwevf`,
  }, {
    id: 2,
    role: 'user',
    name: 'user',
    phone: '+7 (222) 222 22 22',
    token: `53kwemnfvk3m`,
  }, {
    id: 3,
    role: 'admin',
    name: 'admin user',
    phone: '+7 (333) 333 33 33',
    token: `nlwqkenfbgj35`,
  }
];
const findUserByPhone = (phone) => users.find(user => user.phone === phone);

// mock
const mock = new MockAdapter(axios, { delayResponse: 1000 });
mock.onPost('/v1/user/login').reply(config => {
  const { phone, code } = JSON.parse(config.data);
  console.log(phone);
  const user = findUserByPhone(phone);
  if(!user) return [400, { message: 'phone not found' }];

  // only phone
  if(phone && !code) {
    return [200];
  } else if(phone && code) {
    if(codes.includes(code.toLowerCase())) {
      return [200, user];
    } else {
      return [400, {
        message: `wrong secret code`
      }];
    }
  }

});

export default axios;
