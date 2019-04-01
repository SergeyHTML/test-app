import React, {Component, Fragment} from 'react'

class TableTask extends Component{

  state = {};

  render() {
    const {tasks, role} = this.props;

    const tableTr = tasks.map(tr => {

      return(
        <tr key={tr.id} className={`${tr.status === 10 ? 'completed' : ''}`}><td>{tr.id}</td><td>{tr.username}</td><td>{tr.email}</td>
          <td>{tr.status}</td>{role === 'admin' ? this.adminCell(tr) : <td>{tr.text}</td>}</tr>
      )
    });

    return(
      <table className="table task-list">
        <thead>
        <tr>
          <th scope="col" className='sortable' onClick={this.handleSort('id')}>#</th>
          <th scope="col" className='sortable' onClick={this.handleSort('username')}>Name</th>
          <th scope="col" className='sortable' onClick={this.handleSort('email')}>E-mail</th>
          <th scope="col" className='sortable' onClick={this.handleSort('status')}>Status</th>
          <th scope="col">Text</th>
          {role === 'admin' ? <th> </th> : null}
        </tr>
        </thead>
        <tbody>
        {tableTr}
        </tbody>
      </table>
    )
  }

  onChange = (ev) => {
    const name = ev.target.name;
    const val = ev.target.value || ' ';

    this.setState({
      [name]: val
    })
  };

  onChangeCheckbox = (ev) => {
    const name = ev.target.name;
    const val = ev.target.value;

    this.setState({
      [name]: val === '10' ? '0' : '10'
    })
  };

  updateTask = (id) => () => {
    const params = {
      text: this.state[id] || this.refs[`text-${id}`].value,
      status: this.state[`status-${id}`] || this.refs[`status-${id}`].value
    };
    this.props.updateTask(id, params)
  };

  adminCell = (tr) => {
    return(
      <Fragment>
        <td>
          <div>
            <input type='text' ref={`text-${tr.id}`} className="form-control-plaintext form-control-sm"
                   name={tr.id} value={this.state[tr.id] || tr.text} onChange={this.onChange}/>

            <input type='checkbox' ref={`status-${tr.id}`}
                   checked={!!(+this.state[`status-${tr.id}`]) || (!!(+tr.status) && this.state[`status-${tr.id}`] !== '0' )}
                   name={`status-${tr.id}`}
                   value={this.state[`status-${tr.id}`] || tr.status} onChange={this.onChangeCheckbox}  />
          </div>
        </td>
        <td>
          <button onClick={this.updateTask(tr.id)} type="button" className="btn btn-light btn-sm">Update</button>
        </td>
      </Fragment>
    )
  }

  handleSort = (type) => () => {
    this.props.handleSort(type)
  };
}

export default TableTask