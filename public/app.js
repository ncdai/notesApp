var list;

var Note = React.createClass({
    save() {
        var that = this;
        $.post('/update', {idSua: this.props.id, noiDung: this.refs.txt.value}, function(data) {
            list.setState({data: data});
            that.setState({onEdit: false});
        });
    },
    cancel() {
        this.setState({onEdit: false});
    },
    edit() {
        this.setState({onEdit: true});
    },
    delete() {
        $.post('/delete', {idXoa: this.props.id}, function(data) {
            list.setState({data: data});
        });
    },
    getInitialState() {
        return {
            onEdit: false
        }
    },
    render() {
        if (this.state.onEdit) {
            return(
                <li className="list-group-item">
                    <div className="input-group">
                        <input type="text" defaultValue={this.props.children} ref="txt" className="form-control" />
                        <span className="input-group-btn">
                            <button onClick={this.save} className="btn btn-default">Lưu</button>
                            <button onClick={this.cancel} className="btn btn-default">Huỷ</button>
                        </span>
                    </div>
                </li>
            );
        }
        else {
            return(
                <li className="list-group-item including">
                    <div className="pull-left">{this.props.children}</div>
                    <div className="pull-right">
                        <button onClick={this.edit} className="btn btn-link"><i className="glyphicon glyphicon-pencil"></i></button>
                        <button onClick={this.delete} className="btn btn-link"><i className="glyphicon glyphicon-remove"></i></button>
                    </div>
                </li>
            );
        }
    }
});

var InputDiv = React.createClass({
    add() {
        $.post('/add', {note: this.refs.txt. value}, function(data) {
            list.setState({data: data});
        });
        ReactDOM.unmountComponentAtNode(document.getElementById('div-add'));
    },
    render() {
        return(
            <div className="input-group">
                <input type="text" ref="txt" className="form-control" placeholder="Nhập ghi chú của bạn" />
                <span className="input-group-btn">
                    <button onClick={this.add} className="btn btn-default">Thêm</button>
                </span>
            </div>
        );
    }
});

var List = React.createClass({
    show() {
        ReactDOM.render(<InputDiv />, document.getElementById('div-add'));
    },
    getInitialState() {
        list = this;
        return {
            data: []
        }
    },
    render() {
        return(
            <div className="container">
                <div className="including">
                    <h1 className="pull-left">notesApp</h1>
                    <div className="pull-right">
                        <button onClick={this.show} className="btn btn-primary btn-add"><i className="glyphicon glyphicon-plus"></i> Thêm</button>
                    </div>
                </div>
                <div id="div-add"></div>
                <ul className="list-group">
                    {
                        this.state.data.map(function(note, index) {
                            return <Note key={index} id={index}>{note}</Note>
                        })
                    }
                </ul>
            </div>
        );
    },
    componentDidMount() {
        var that = this;
        $.post('/getNotes', function(data) {
            that.setState({data: data});
        });
    }
});

ReactDOM.render(
    <List />
    , document.getElementById('root')
);
