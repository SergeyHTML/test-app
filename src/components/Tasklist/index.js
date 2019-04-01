import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadTasks, editTask} from '../../AC'
import Pagination from '../Pagination'
import SignIn from '../SignIn'
import TableTask from '../TableTask'
import './style.scss'
import md5 from 'md5'
import encode from 'encode-3986'

class Taskslist extends Component {

  static propTypes = {
    articles: PropTypes.array,
  };

  state = {
    sort_field: 'id',
    sort_direction: 'asc',
    page: 1
  };

  componentDidMount() {
    const {loadTasks} = this.props;
    loadTasks(this.state);
  }

  componentDidUpdate(prevProps, prevState){
    const {edited, loadTasks} = this.props;

    if (edited) {
      loadTasks(this.state);
    }

    if (prevState !== this.state){
      loadTasks(this.state);
    }
  }

  render() {
    const {tasks, total_task_count, user} = this.props;

    return (
      <div>

        <SignIn/>
        <TableTask role={user.status} updateTask={this.updateTask}  handleSort={this.handleSort} tasks={tasks}/>
        <Pagination goToPage={this.goToPage} carrentPage={this.state.page} total_task_count={total_task_count} />

      </div>
    )
  }

  goToPage = page => {
    if (this.state.page === page) return;
    this.setState({page: page})
  };

  handleSort = (type, sort = this.state.sort_direction) => {
    this.setState({
      sort_field: type,
      sort_direction: type !== this.state.sort_field || sort === 'desc' ? 'asc' : 'desc'
    })
  };

  updateTask = (id, params) => {
    const {editTask} = this.props;
    const signature = md5(`status=${encode(params.status)}&text=${encode(params.text)}&token=beejee`);
    const dataSend = Object.assign(params, {token: 'beejee', signature: signature});
    editTask(id, dataSend);
  };
}

export default connect((state) => ({
  tasks: state.tasks.entities.valueSeq().toArray(),
  total_task_count: state.tasks.total_task_count,
  status: state.tasks.count,
  edited: state.tasks.edited,
  user: state.signin
}), {loadTasks, editTask})(Taskslist)