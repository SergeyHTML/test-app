import {EDIT, LOAD_TASKS, START, SUCCESS} from '../constans'
import {OrderedMap, Record} from 'immutable'

const TaskModel = Record({
  id: null,
  status: null,
  text: '',
  username: null,
  email: null,
  completed: false
});

const DefaultReducerState = Record({
  entities: new OrderedMap({}),
  status: '',
  total_task_count: null,
  loading: false,
  loaded: false,
  edited: false
});

export default (tasks = new DefaultReducerState(), action) => {
  const {type, payload} = action;
  const arrayToMap = (arr, RecordModel) => {
    return arr.reduce((acc, el) => acc.set(el.id, RecordModel ? new RecordModel(el) : el), new OrderedMap({}))
  };
  switch (type) {
    case LOAD_TASKS + START:
      return tasks
        .set('edited', false);

    case LOAD_TASKS + SUCCESS:
      return tasks
        .set('entities', arrayToMap(payload.response.message.tasks, TaskModel))
        .set('loading', false)
        .set('loaded', true)
        .set('status', payload.response.status)
        .set('total_task_count', payload.response.message.total_task_count);

      case EDIT + SUCCESS:
      return tasks
        .set('edited', true);
    default:
      return tasks
  }
}