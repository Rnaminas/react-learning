import React from 'react';
import './Notification.scss';

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.showNotification,
            items: []
        };
        this.removeNotification = this.removeNotification.bind(this);
    }

    removeNotification(e) {
        let id = parseInt(e.target.getAttribute("data-note-id"));
        //console.log(id);
        this.setState({
            items: this.state.items.filter(item => item !== id),
        });
    }

    componentDidMount() {
        let items = this.props.itemsHandle;
        this.setState({
            items: items
        });
    }

    render() {
        let items = this.state.items;
        return (
            <>
                <ul className="notification-list">
                    {items.map(item => (
                        <li className="notification-list__item" key={item}>
                            <p>Post with id <strong>{item}</strong> is removed.</p>
                            <button data-note-id={item} type="button" onClick={this.removeNotification} className="button-close">close</button>
                        </li>
                    ))}

                </ul>
            </>
        )
    }
}

export default Notification;