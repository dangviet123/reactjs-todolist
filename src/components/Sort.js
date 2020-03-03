import React from 'react';

class Sort extends React.Component{
    sortOrderBy = (name,value) =>{
       this.props.onsortOrderBy(name,value);
       
    }
    render(){
        return(
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            
                <div className="dropdown">
                
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenu1"                             
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                    >
                    Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li>
                        <span role="button">
                            <span className="fa fa-sort-alpha-asc pr-5" onClick={() => this.sortOrderBy("name",1)} >
                            Tên A-Z 
                            <i className={this.props.sortBy ==='name' && this.props.sortValue===1 ? 'fa fa-check  pull-right' : ''} />
                            </span>
                        </span>
                    </li>
                    <li>
                        <span role="button">
                            <span className="fa fa-sort-alpha-desc pr-5" onClick={() => this.sortOrderBy("name",-1)}>
                            Tên Z-A
                            <i className={this.props.sortBy ==='name' && this.props.sortValue===-1 ? 'fa fa-check  pull-right' : ''} />
                            </span>
                        </span>
                    </li>
                    <li role="separator" className="divider" />
                    <li>
                        <span role="button" onClick={() => this.sortOrderBy("status",1)}>
                        Trạng Thái Kích Hoạt
                        <i className={this.props.sortBy ==='status' && this.props.sortValue===1 ? 'fa fa-check  pull-right' : ''} />
                        </span>
                    </li>
                    <li>
                        <span role="button" onClick={() => this.sortOrderBy("status",-1)}>
                        Trạng Thái Ẩn
                        <i className={this.props.sortBy ==='status' && this.props.sortValue===-1 ? 'fa fa-check  pull-right' : ''} />
                        </span>
                    </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sort;
