import React from 'react';

class TaskItem extends React.Component{
  changeStatus = () => {
    this.props.onUpdateStatus(this.props.task.id);
  }
  deleteItem = () => {
    this.props.onDelete(this.props.task.id);
  }
  updateItem = () => {
    this.props.onUpdate(this.props.task.id);
  }
  render(){
    return(
        <tr>
            <td>{this.props.index+1}</td>
            <td>{this.props.task.name}</td>
            <td className="text-center">
              <span className={this.props.task.status===true ? 'label label-success' : 'label label-danger'} onClick={this.changeStatus}>
              {this.props.task.status===true ? 'Kích hoạt' : 'Tạm ngưng'}
              </span>
            </td>
            <td className="text-center">
            <button type="button" className="btn btn-warning" onClick={this.updateItem}>
                <span className="fa fa-pencil mr-5" />
                Sửa
            </button>
            &nbsp;
            <button type="button" className="btn btn-danger" onClick={this.deleteItem}>
                <span className="fa fa-trash mr-5" />
                Xóa
            </button>
            </td>
        </tr>
    )
  }
}
export default TaskItem;
