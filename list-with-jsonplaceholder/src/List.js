import React from "react";
import './List.scss';
import deleteIcon from './delete.svg';
import editIcon from './edit.svg';
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
            newPost: []
        };
        this.removeItem = this.removeItem.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    items: result,
                    showModal: false
                })
            });
    }


    componentWillUnmount() {
        let newpost = localStorage.getItem('post');
        this.setState({
            newPost: newpost,
        });
        console.log(newpost);
    }

    removeItem(e) {
        let id = parseInt(e.target.getAttribute("id"));
        let currentItems = this.state.itemsHandle;
        currentItems.push(id);
        this.setState({
            items: this.state.items.filter(item => item.id !== id),
            showNotification: true,
            itemsHandle: currentItems
        });
    }

    toggleModal() {
        if (this.state.showModal) {
            this.setState({
                showModal: false
            })
        } else {
            this.setState({
                showModal: true
            })
        }
    }


    render() {
        let items = this.state.items;
        let notification, modal;
        if (this.state.showNotification && this.state.itemsHandle.length > 0) {
            notification =
                <Notification itemsHandle={this.state.itemsHandle} showNotification={this.state.showNotification}/>;
        }
        if (this.state.showModal) {
            modal = <Modal><ModalChild showModal={this.state.showModal}/></Modal>
        }

        return (
            <>
                <button className="button-add" type="button" onClick={this.toggleModal}>Add post</button>
                <ul>
                    {items.map(item => (
                        <li key={item.id.toString()}>
                            <p className="item-id">{item.id}</p>
                            <p className="title">{item.title}</p>
                            <p className="body">{item.body}</p>
                            <button>Edit
                                <img src={editIcon} alt="Delete" width="16" height="16"/>
                            </button>
                            <button className="button-delete" id={item.id} onClick={this.removeItem}>Delete
                                <img src={deleteIcon} alt="Delete" width="16" height="16"/>
                            </button>
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