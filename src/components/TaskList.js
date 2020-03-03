import React from 'react';
import TaskItem from './TaskItem';
class TaskList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            nameFilter: '',
            statusFilter: -1
        }
    }
    onchange = (ev) => {
        var target = ev.target;
        var name = target.name;
        var value = target.value;
        var state = this.state;
        state[name] = value;
        this.setState(state);
        this.props.onFilter(state);
    }
    render(){
        var {tasks} = this.props; // cú pháp es6  == this.props.tasks
        var elmTasks = tasks.map((task,index) => {
            return <TaskItem 
            key={task.id} 
            index={index} 
            task={task} 
            onUpdateStatus={this.props.onUpdateStatus}
            onDelete={this.props.onDelete} 
            onUpdate={this.props.onUpdate}
            />
        }) 
        return(
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td />
                    <td>
                    <input 
                    type="text" 
                    value={this.state.nameFilter}
                    onChange={this.onchange}
                    name="nameFilter"
                    className="form-control" />
                    </td>
                    <td>
                        <select 
                        className="form-control" 
                        onChange={this.onchange}
                        value={this.state.statusFilter}
                        name="statusFilter">
                            <option value={-1}>Tất Cả</option>
                            <option value={0}>Ẩn</option>
                            <option value={1}>Kích Hoạt</option>
                        </select> 
                    </td>
                    <td />
                </tr>
                {elmTasks}
                </tbody>
            </table>
        )
    }
}
export default TaskList;
