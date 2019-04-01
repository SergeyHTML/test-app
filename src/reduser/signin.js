import {SIGNIN} from '../constans'
import {Record} from 'immutable'

const admin = {
  status: 'admin',
  name: 'Admin'
};

const userModel = Record({
  status: 'user',
  name: 'User'
});

export default (user = new userModel(), action) => {
  const {type, payload} = action;

  switch (type) {
    case SIGNIN:
      const {signIn: {login, pass}} = payload;
      return (login === 'admin' && pass === '123') ? admin : user;
    default:
      return user
  }
}