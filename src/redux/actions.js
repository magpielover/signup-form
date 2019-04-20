/*
Actions define what happened in the UI
*/

import { ActionTypes } from "./actionTypes";

/*
 * action creators
 */
export const toggleSort = order => ({
  type: ActionTypes.TOGGLE_SORT,
  payload: order
});
export const deleteUser = user => ({
  type: ActionTypes.DELETE_USER,
  payload: user
});
export const editUser = user => ({
  type: ActionTypes.EDIT_USER,
  payload: user
});
export const addUser = user => ({
  type: ActionTypes.ADD_USER,
  payload: user
});
