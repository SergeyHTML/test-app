import $ from 'jquery'
import {LOAD_TASKS, START, SUCCESS, FAIL, SIGNIN, EDIT} from '../constans'

export function loadTasks(params) {
  const {sort_field, sort_direction, page} = params
  return (dispatch) => {
    dispatch({
      type: LOAD_TASKS + START,
    })

    $.get(`https://uxcandy.com/~shapoval/test-task-backend/?developer=Sergey&sort_field=${sort_field}&sort_direction=${sort_direction}&page=${page}`)
      .done((response) => dispatch({
        type: LOAD_TASKS + SUCCESS,
        payload: {response, params}
      }))
      .fail(error => {
        dispatch({
          type: LOAD_TASKS + FAIL,
          payload: {error}
        })
      })
  }
}

export function signIn(signIn) {
  return (dispatch) => {

    $.get(`https://uxcandy.com/~shapoval/test-task-backend?developer=Name`)
      .done((response) => dispatch({
        type: SIGNIN + SUCCESS,
        payload: response
      }))
      .fail(() => {
        dispatch({
          type: SIGNIN,
          payload: {signIn}
        })
      })

  }
}

export function editTask(id, data) {

  return (dispatch) => {
    $.post(`https://uxcandy.com/~shapoval/test-task-backend/edit/${id}?developer=Sergey`, data)
      .done((response) => dispatch({
        type: EDIT + SUCCESS,
        payload: {response, id}
      }))
      .fail((error) => dispatch({
        type: EDIT + FAIL,
        payload: { error }
      }))
  }
}