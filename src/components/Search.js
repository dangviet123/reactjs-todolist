import React from 'react';

class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }
    onChange = (ev) => {
        var target = ev.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
        
    }
    searchKeyword = () => {
        this.props.sKeyword(this.state.keyword);
    }
    render(){
        return(
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input
                        type="text"
                        name="keyword"
                        value = {this.state.keyword}
                        onChange={this.onChange}
                        className="form-control"
                        placeholder="Nhập từ khóa..."
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={this.searchKeyword}>
                            <span className="fa fa-search mr-5" />
                            Tìm
                        </button>
                    </span>
                </div>
            </div>   
        )
    }
}

export default Search;
