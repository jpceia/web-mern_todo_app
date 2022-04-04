import formatDistance from 'date-fns/formatDistance';

const timeDistance = (date) => {
    const now = new Date();
    const distance = formatDistance(new Date(date), now);
    return distance;
};

const TodoItem = ({ todo, onDelete }) => {
    return (
        <li>
            <div>
                {todo.action}
                <button
                    className="delete-btn"
                    onClick={onDelete}
                >❌</button>
                <br/>
                <small style={{fontSize: "0.5em"}}>Created {timeDistance(todo.date)} ago.</small>
            </div>
        </li>
    );
}

export default TodoItem;
