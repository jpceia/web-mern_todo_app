import React, { useState } from 'react';
import * as api from '../api/index';


const Input = ({getTodos}) => {
    const [state, setState ] = useState({ action: '' });

    const addTodo = () => {
        const task = { action: state.action };

        if (task.action && task.action.length > 0) {
            api.createTodo(task)
                .then((response) => {
                    if (response.data)
                    {
                        getTodos();
                        setState({ action: '' });
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

    return (
        <div>
            <input
                type="text"
                onChange={(e) => setState({ action: e.target.value })}
                value={state.action}    
            />
            <button onClick={addTodo}>Add</button>
        </div>
    );
}

export default Input;
