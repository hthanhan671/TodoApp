import React from "react";
import Todo from "./Todo";
class TodoList extends React.Component {
    state = {
        listTodos: [
            {
                id: 'todo1',
                title: 'Brush my teeth'
            },
            {
                id: 'todo2',
                title: 'Wash my face'
            },
            {
                id: 'todo3',
                title: 'Exercise'
            }
        ],
        editTodo: {}
    };

    addTodo = (todo) => {
        this.setState({
            listTodos: [...this.state.listTodos, todo]
        })
    }

    handleDeleteTodo = (todo) => {
        let currentTodos = this.state.listTodos;
        currentTodos = currentTodos.filter(item => item.id !== todo.id);
        this.setState({
            listTodos: currentTodos
        })
    }

    handleEditTodo = (todo) => {
        let { editTodo, listTodos } = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;
        if (isEmptyObj === false && editTodo.id === todo.id) {

            let listTodosCopy = [...listTodos];
            let objIndex = listTodosCopy.findIndex(item => item.id === todo.id);
            listTodosCopy[objIndex].title = editTodo.title
            this.setState({
                listTodos: listTodosCopy,
                editTodo: ''
            })
            return;
        }
        this.setState({
            editTodo: todo
        })
    }

    handleChangeEditTodo = (event) => {
        let editTodoCopy = { ...this.state.editTodo };
        editTodoCopy.title = event.target.value;
        this.setState({
            editTodo: editTodoCopy
        })
    }
    render() {
        let { listTodos, editTodo } = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;
        return (
            <div className="list-todo-container">
                <h1>What's the Plan for Today?</h1>
                <Todo addTodo={this.addTodo} />
                <div className="list-todo-content">
                    {listTodos && listTodos.length > 0 &&
                        listTodos.map((item, index) => {
                            return (
                                <div className="todo-child" key={item.id}>

                                    {isEmptyObj === true ?
                                        <span>{index + 1} - {item.title}</span>
                                        :

                                        <>
                                            {editTodo.id === item.id ?
                                                <span> {index + 1} - <input value={editTodo.title} className="todo-input todo-input-edit"
                                                    onChange={(event) => this.handleChangeEditTodo(event)} />
                                                </span>
                                                :
                                                <span>{index + 1} - {item.title}</span>
                                            }
                                        </>

                                    }
                                    <button className="todo-button edit"
                                        onClick={() => this.handleEditTodo(item)}
                                    >
                                        {isEmptyObj === false && editTodo.id === item.id ?
                                            'Save' : 'Edit'
                                        }

                                    </button>
                                    <button className="todo-button" onClick={() => this.handleDeleteTodo(item)}>Delete</button>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}
export default TodoList;