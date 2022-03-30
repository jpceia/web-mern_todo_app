import React, { Component } from 'react';
import * as api from '../api/index';

class Input extends Component {
    state = {
        action: '',
    };

    addTodo = () => {
        const task = { action: this.state.action };

        if (task.action && task.action.length > 0) {
            api.createTodo(task)
                .then((response) => {
                    if (response.data)
                    {
                        this.props.getTodos();
                        this.setState({ action: '' });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else
        {
            console.log('input field required');
        }
    };

    handleChange = (event) => {
        this.setState({ action: event.target.value });
    };

    render() {
        let { action } = this.state;
        return (
            <div>
                <input type="text" onChange={this.handleChange} value={action} />
                <button onClick={this.addTodo}>Add</button>
            </div>
        );
    };
}

export default Input;
