import React from 'react';
import './Notification.scss';

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: []};
        this.removeNotification = this.removeNotification.bind(this);
    }


    removeNotification(e) {
        let index = parseInt(e.target.getAttribute("data-index"));
        this.state.items.splice(index, 1);
        if (this.state.items.length >= 1) {
            this.setState({items: this.state.items,});
        } else {
            this.setState({
                items: [], show: false
            });
            this.props.status(false);
        }
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

    componentDidMount() {
        this.setState({
            items: this.props.items,
        });
    }

    render() {
        let items = this.state.items;
        return (
            <>
                <ul className="notification-list">
                    {items.map((item, index) => (
                        <li className={"notification-list__item notification-list__item--" + item['type']}
                            key={item['postId']}>
                            <p>Post with id <strong>{item['postId']}</strong> is {this.getType(item['type'])}.</p>
                            <button data-index={index} type="button" onClick={this.removeNotification}
                                    className="button-close">
                                close
                            </button>
                        </li>
                    ))}

                </ul>
            </>
        )
    }
}

export default Notification;