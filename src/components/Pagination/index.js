import React, {Component} from 'react'

class Pagination extends Component {

  render() {
    const {total_task_count, carrentPage} = this.props;

    const pages = this.createPages(total_task_count, carrentPage);

    return(
      <nav>
        <ul className="pagination">
          {pages}
        </ul>
      </nav>
    )
  }

  createPages = (total_task_count, carrentPage) => {
    const pages = [];
    const lastPage = Math.floor(total_task_count/3+1);
    for (let i = 1; i <= total_task_count/3; i++) {
      pages.push(<li key={i} className="page-item"><span onClick={this.goToPage(i)}
                                                         className={`page-link ${carrentPage === i ? 'default' : ''}`} >{i}
                                                         </span></li>)
    }

    if (total_task_count % 3 !== 0) pages.push(<li key={lastPage} className="page-item">
                                                <span onClick={this.goToPage(lastPage)}
                                                      className={`page-link ${carrentPage === lastPage ? 'default' : ''}`} >
                                                  {lastPage}
                                                 </span></li>);

    return pages;
  }

  goToPage = page => () => {
    this.props.goToPage(page)
  }
}

export default Pagination;