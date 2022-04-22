import React from "react"

const Footer = (props => {
    const {newTodo, setFilter, clickButton, handleClearCompleted} = props;

    return (
        <>
            <button className={`${clickButton === 'All' ? "selected" : ''}`}
                onClick={()=>setFilter('All')} href="#/" id="all"
            >All</button>
            <button className={`${clickButton === 'Active' ? "selected" : ''}`}
                onClick={()=>setFilter('Active')} href="#/active" id="active"
            >Active</button>
            <button className={`${clickButton === 'Completed' ? "selected" : ''}`}
                onClick={()=>setFilter('Completed')} href="#/completed" id="completed"
            >Completed</button>
            <button className="clear"
                onClick={()=>handleClearCompleted(newTodo)}
            >Clear</button><hr/>
        </>
    );
});

export default Footer;