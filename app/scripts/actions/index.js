import * as types from '../constants/ActionTypes';

function action(type, payload = {}) {
  return {type, ...payload}
}
