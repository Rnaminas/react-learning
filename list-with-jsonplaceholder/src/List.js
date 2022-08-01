import React from "react";
import './List.scss';
import Notification from './Notification';
import Modal from "./Modal";
import ModalChild from "./ModalChild";

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            showNotification: false,
            itemsHandle: [],
            showModal: false,
            modalPost: {},
        };
        this.removeItem = this.removeItem.bind(this);
        this.openModal = this.openModal.bind(this);
        this.getNewPost = this.getNewPost.bind(this);
        this.editItem = this.editItem.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeNotifications = this.closeNotifications.bind(this);
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
        let notificationItem = {postId: id, type: 'remove'};
        let currentItems = this.state.itemsHandle;
        currentItems.push(notificationItem);
        this.setState({
            items: this.state.items.filter(item => item.id !== id),
            showNotification: true,
            itemsHandle: currentItems,
        });
    }

    editItem(e) {
        let id = parseInt(e.target.getAttribute("id"));
        let index = this.state.items.findIndex(item => item['id'] === id);
        this.setState({
            showModal: true,
            modalPost: this.state.items[index]
        });
    }

    openModal() {
        this.setState({showModal: true, modalPost: {}})
    }

    closeModal(status) {
        this.setState({showModal: status});
    }

    closeNotifications(status) {
        this.setState({showNotification: status});
    }

    getNewPost(post) {
        let posts = this.state.items;
        let index = posts.findIndex(item => item['id'] === post[0]['id']);
        let currentItems = this.state.itemsHandle;

        if (index < 0) {
            let notificationItem = {postId: post[0]['id'], type: 'add'};
            currentItems.push(notificationItem);
            this.setState({
                items: [...posts, ...post],
                showNotification: true,
                itemsHandle: currentItems,
            });
        } else {
            let notificationItem = {postId: post[0]['id'], type: 'edit'};
            currentItems.push(notificationItem);
            posts[index]['title'] = post[0]['title'];
            posts[index]['body'] = post[0]['body'];
            this.setState({
                items: posts,
                showNotification: true,
                itemsHandle: currentItems,
            });
        }
    }

    render() {
        let items = this.state.items;
        let notification, modal;
        if (this.state.showNotification && this.state.itemsHandle.length > 0) {
            notification = <Notification items={this.state.itemsHandle} show={this.state.showNotification}
                                         status={this.closeNotifications}/>;
        }
        if (this.state.showModal) {
            modal = <Modal>
                <ModalChild post={this.state.modalPost} allItems={this.state.items} onChangePost={this.getNewPost}
                            status={this.closeModal}/>
            </Modal>
        }

        return (
            <>
                <button className="button-add" type="button" onClick={this.openModal}>Add post</button>
                <ul className="post-list">
                    {items.map(item => (
                        <li className="post-list__item" key={item.id.toString()}>
                            <p className="item-id">{item.id}</p>
                            <p className="title">{item.title}</p>
                            <p className="body">{item.body}</p>
                            <div className="buttons">
                                <button className="button-edit" id={item.id} onClick={this.editItem}
                                        type="button">Edit
                                </button>
                                <button className="button-delete" type="button" id={item.id}
                                        onClick={this.removeItem}>Delete
                                </button>
                            </div>

                        </li>
                    ))}
                </ul>
                {notification}
                {modal}

            </>
        )
    }
}

export default List;