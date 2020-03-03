import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import _ from 'lodash';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      isDisPlayForm: false,
      taskEditting: {},
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sort: {
        by: 'name',
        value: 1
      }
    }
  }
  componentDidMount(){ // hàm khởi tạo khi load trang
    if(localStorage && localStorage.getItem("tasks")){
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks
      })
    }
  }
  generalKey(length){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  onCreateForm = () => { // error func
    this.setState({
      isDisPlayForm: true,
      taskEditting: {}
    });
  }
  onHideForm = (ev) => {
    if(ev === true){
      this.setState({
        isDisPlayForm: false
      });
    }
  }
  onSubmit = (ev) => {
    var {tasks} = this.state;
    if (!ev.id) {
      var task = {
        id: this.generalKey(5),
        name: ev.name,
        status: ev.status
      }
      tasks.push(task);
      this.setState({
        tasks: tasks
      });
    }else{
      var index = this.findIndex(ev.id);
      tasks[index].status = ev.status
      tasks[index].name = ev.name;
    }
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }
  onUpdateStatus = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if(index !== -1){
      tasks[index].status =  !tasks[index].status;
    }
    this.setState({
      tasks: tasks
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }
  findIndex(id){
    var {tasks} = this.state;
    var result = -1;
    tasks.forEach((task,index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }
  onDelete = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if(index !== -1){
      tasks.splice(index,1);
    }
    this.setState({
      tasks: tasks
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }
  onUpdate = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    var taskEditting = tasks[index];
    this.setState({
      taskEditting: taskEditting
    });
    this.setState({
      isDisPlayForm: true
    });
  }
  onFilter = (ev) => {
    var nameFilter = ev.nameFilter.toLowerCase();
    var statusFilter = parseInt(ev.statusFilter);
    this.setState({
      filter: {
        name: nameFilter,
        status: statusFilter
      }
    });
  }
  sKeyword = (ev)=> {
    this.setState({
      keyword: ev.toLowerCase()
    })
  }
  onsortOrderBy = (name,value) => {
    var sort = this.state.sort;
    sort.by = name;
    sort.value = value;
    this.setState({
      sort: sort
    })
  }
  render(){
    var {tasks,isDisPlayForm,filter,keyword,sort} = this.state;
    


    var emlTaskForm = isDisPlayForm === true ? <TaskForm onSubmit={this.onSubmit} onHideForm={this.onHideForm} taskEditting={this.state.taskEditting} /> : '';
    if (keyword) {

      tasks =_.filter(tasks,(task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
      // if (keyword !== '') {
      //   tasks = tasks.filter((task) => {
      //     return task.name.toLowerCase().indexOf(keyword) !== -1;
      //   });
      // }
    }
    if (filter) {
      if (filter.name !== '') {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        }else{
          return task.status === (filter.status === 1? true : false);
        }
      });
      
    }
    if (sort) {
      if (sort.by ==='name') {
        tasks = tasks.sort((a,b) => {
          if (a.name < b.name) {
            return -sort.value;
          }
          if (a.name > b.name) {
            return sort.value;
          }
          return 0;
        });
      }
      
      if (sort.by ==='status') {
        tasks = tasks.sort((a,b) => {
          if (sort.value ===1 ) {
            return b.status - a.status;
          }else{
            return a.status - b.status;
          }
        });
      }
    }
    return(
      <div className="container">
        <div className="text-center">
          <h1> REACTJS - DEMO </h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisPlayForm ===true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
            {emlTaskForm}
          </div>
          <div className={isDisPlayForm ===true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type="button" className="btn btn-primary" onClick={this.onCreateForm}>
              <span className="fa fa-plus mr-5" />
              Thêm Công Việc
            </button>
            <Control 
              sKeyword={this.sKeyword} 
              onsortOrderBy={this.onsortOrderBy} 
              sortBy={sort.by} 
              sortValue={sort.value}
              />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList 
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus} 
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default App;
