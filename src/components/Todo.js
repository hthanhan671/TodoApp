import React from "react";

class Todo extends React.Component {
    state = {
        title: ''
    };

    handleChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    handleAddTodo = () => {
        if (!this.state.title || /^\s*$/.test(this.state.title)) {
            return;
        }
        let todo = {
            id: Math.floor(Math.random() * 10000),
            title: this.state.title
        }
        this.props.addTodo(todo)
        this.setState({ title: '' });
    };
    render() {
        let { title } = this.state;
        return (
            <div className="add-todo">
                <input
                    type="text"
                    placeholder="Add a todo..."
                    value={title}
                    className="todo-input" onChange={(event) => this.handleChangeTitle(event)} />
                <button className="todo-button" onClick={() => this.handleAddTodo()}>Add todo</button>
            </div>
        )
    }
};
export default Todo;