import React from 'react';

class TaskForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: true
        }
    }
    componentDidMount(){
        if (this.props.taskEditting.id) {
            var id = this.props.taskEditting.id;
            var name = this.props.taskEditting.name;
            var status = this.props.taskEditting.status;
            this.setState({
                id: id,
                name: name,
                status: status
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){ // theo dõi sự thay đổi của các props
        if (nextProps.taskEditting.id) {
            var id = nextProps.taskEditting.id;
            var name = nextProps.taskEditting.name;
            var status = nextProps.taskEditting.status;
            this.setState({
                id: id,
                name: name,
                status: status
            });
        }else {
            this.setState({
                id: '',
                name: '',
                status: true
            });
        }
    }
    HideForm = () => {
        this.props.onHideForm(true);
    }
    onChange = (ev) =>{
        var target = ev.target;
        var name = target.name;
        var val = target.value;
        if (target.type === "select-one") {
            if (val === "true") {
                val = true;
            }else if (val === "false") {
                val = false;
            }else{
                val = target.value;
            }
        }
        this.setState({
            [name]: val
        });
    }
    onSubmit = (ev) => {
        ev.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.HideForm();
    }
    onClear = (ev) => {
        this.setState({
            name: '',
            status: false
        });
    }
    render(){
        return(
            <div className="panel panel-warning">
                
                <div className="panel-heading">
                <h3 className="panel-title"> { this.props.taskEditting.name ? 'Chỉnh sửa công việc' : 'Thêm Công Việc'}  
                <i style={{cursor: 'pointer'}} className="fa fa-close pull-right" onClick={this.HideForm} /></h3>
                </div>
                <div className="panel-body">
                <form>
                    <div className="form-group">
                    <label>Tên :</label>
                    <input 
                        type="text" 
                        name="name"
                        className="form-control" 
                        onChange={this.onChange}
                        value={this.state.name}
                    />
                    </div>
                    <label>Trạng Thái :</label>
                    <select 
                        name="status"
                        className="form-control"  
                        onChange={this.onChange}
                        value={this.state.status}
                    >
                    <option value={true}>Kích Hoạt</option>
                    <option value={false}>Ẩn</option>
                    </select>
                    <br />
                    <div className="text-center">
                    <button type="submit" className="btn btn-warning" onClick={this.onSubmit}>
                        Lưu lại
                    </button>
                    &nbsp;
                    <button type="reset" className="btn btn-danger" onClick={this.onClear}>
                        Hủy Bỏ
                    </button>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}

export default TaskForm;
