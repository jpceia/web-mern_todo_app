import React, { Component } from 'react';
import axios from 'axios';
import Input from './Input';
import ListTodo from './ListTodo';

class Todo extends Component {
    state = {
        todos: [],
    };

    componentDidMount() {
        this.getTodos();
    }

    getTodos = () => {
        axios
            .get('/api/todos')
            .then((response) => {
                if (response.data)
                {
                    this.setState({ todos: response.data });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    deleteTodo = (id) => {
        axios
            .delete(`/api/todos/${id}`)
            .then((response) => {
                if (response.data)
                {
                    this.getTodos();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render()
    {
        let { todos } = this.state;

        return (
            <div>
                <h1>My Todo(s)</h1>
                <Input getTodos={this.getTodos} />
                <ListTodo todos={todos} deleteTodo={this.deleteTodo} />
            </div>
        );
    };
}

export default Todo;