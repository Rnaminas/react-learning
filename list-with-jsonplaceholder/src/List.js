import React from 'react';
import './List.scss';
import deleteicon from './delete.svg';

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            items: []
        };
        this.removeItem = this.removeItem.bind(this);
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    items: result
                })
            });
    }

    removeItem(e) {
        let id = parseInt(e.target.getAttribute("id"));
        this.setState({
            items: this.state.items.filter(item => item.id !== id)
        })
    }

    render() {
        let items = this.state.items;
        return (
            <ul>
                {items.map(item => (
                    <li key={item.id.toString()}>
                        <p className="item-id">{item.id}</p>
                        <p className="title">{item.title}</p>
                        <p className="body">{item.body}</p>
                        <button id={item.id} onClick={this.removeItem}>Remove
                            <img src={deleteicon} alt="Delete" width="16" height="16"/>
                        </button>
                    </li>
                ))}
            </ul>
        )
    }
}

export default List;