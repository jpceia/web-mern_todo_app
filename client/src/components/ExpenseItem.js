import formatDistance from 'date-fns/formatDistance';

const timeDistance = (date) => {
    const now = new Date();
    const distance = formatDistance(new Date(date), now);
    return distance;
};

const ExpenseItem = ({ expense, onDelete }) => {
    return (
        <li>
            <div>
                {expense.action}
                <button
                    className="delete-btn"
                    onClick={onDelete}
                >❌</button>
                <br/>
                <small style={{fontSize: "0.5em"}}>Created {timeDistance(expense.date)} ago.</small>
            </div>
        </li>
    );
}

export default ExpenseItem;
