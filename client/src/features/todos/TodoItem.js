
const TodoItem = ({ todo, onDelete }) => {
    return (
        <li>
            <div>
                {todo.action}
                <button
                    className="delete-btn"
                    onClick={onDelete}
                >❌</button>
            </div>
        </li>
    );
}

export default TodoItem;
