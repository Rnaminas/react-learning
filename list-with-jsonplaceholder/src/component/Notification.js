import React from 'react';
import '../scss/Notification.scss';

class Notification extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    getType(type) {
        switch (type) {
            case 'add':
                return 'added';
            case 'edit':
                return 'edited';
            case 'remove':
                return 'removed';
            default:
                return '';
        }
    }

    render() {
        return (
            <ul className="notification-list">
                {this.props.itemsHandle.map((item) => (
                    <li className={"notification-list__item notification-list__item--" + item.type}
                        key={item.postId}>
                        <p>Post with id <strong>{item.postId}</strong> is {this.getType(item.type)}.</p>
                        <button
                            type="button"
                            onClick={() => this.props.removeNotification(item.postId)}
                            className="button-close">
                                close
                        </button>
                    </li>
                ))}
            </ul>
        )
    }
}

export default Notification;