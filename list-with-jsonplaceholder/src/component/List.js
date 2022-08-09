import React from "react";
import Notification from './Notification';
import Modal from "./Modal";
import ModalChild from "./ModalChild";
import '../scss/List.scss';

class List extends React.Component {
    state = {
        items: [],
        showNotification: false,
        itemsHandle: [],
        showModal: false,
        modalContent: {},
        modalType: ''
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    items: data
                })
            });
    }

    openModal = () => {
        this.setState({showModal: true, modalType: 'add'})
    }

    closeModal = () => {
        this.setState({showModal: false});
    }

    onChangePost = (post, modalType) => {
        if (modalType === 'add') {
            this.setState({
                items: [...this.state.items, post],
                showNotification: true,
                showModal: false,
                itemsHandle: [...this.state.itemsHandle, {postId: post.id, type: modalType}],
            });
            return;
        }

        const items = this.state.items.map(item => {
            if (item.id === post.id) {
                item = post;
            }
            return item;
        })

        this.setState({
            items,
            showNotification: true,
            showModal: false,
            itemsHandle: [...this.state.itemsHandle, {postId: post.id, type: modalType}],
        });
    }

    removeItem = (id) => {
        this.setState({
            items: this.state.items.filter(item => item.id !== id),
            showNotification: true,
            itemsHandle: [...this.state.itemsHandle, {postId: id, type: 'remove'}],
        });
    }

    editItem = (id) => {
        let currentItem = this.state.items.find(item => item.id === id);
        this.setState({
            showModal: true,
            modalContent: {title: currentItem.title, body: currentItem.body},
            modalType: 'edit'
        });
    }

    showNotificationHandler = (status) => {
        if (status) {
            return (
                <Notification
                    itemsHandle={this.state.itemsHandle}
                    removeNotification={this.removeNotification}
                />
            )
        }
        return null;
    }

    showModalHandler = (status) => {
        if (status) {
            return (
                <Modal>
                    <ModalChild
                        modalContent={this.state.modalContent}
                        modalType={this.state.modalType}
                        onChangePost={this.onChangePost}
                        closeModal={this.closeModal}
                    />
                </Modal>
            )
        }
        return null;
    }

    removeNotification = (postId) => {
        this.setState({itemsHandle: this.state.itemsHandle.filter((item => item.postId !== postId))});
    }

    render() {
        return (
            <>
                <button className="button-add" type="button" onClick={this.openModal}>Add post</button>
                <ul className="post-list">
                    {this.state.items.map(item => (
                        <li className="post-list__item" key={item.id.toString()}>
                            <p className="item-id">{item.id}</p>
                            <p className="title">{item.title}</p>
                            <p className="body">{item.body}</p>
                            <div className="buttons">
                                <button
                                    className="button-edit"
                                    id={item.id}
                                    onClick={() => this.editItem(item.id)}
                                    type="button">
                                    Edit
                                </button>
                                <button className="button-delete" type="button"
                                        onClick={() => this.removeItem(item.id)}>Delete
                                </button>
                            </div>

                        </li>
                    ))}
                </ul>
                {this.showNotificationHandler(this.state.showNotification)}
                {this.showModalHandler(this.state.showModal)}
            </>
        )
    }
}

export default List;