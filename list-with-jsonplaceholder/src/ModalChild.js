import React from 'react';

class ModalChild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: this.props.showModal,
            id: '',
            title: '',
            text: '',
        }

        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormId = this.handleFormId.bind(this);
        this.handleFormTitle = this.handleFormTitle.bind(this);
        this.handleFormText = this.handleFormText.bind(this);
    }

    closeModal() {
        this.setState({showModal: false});
    }


    handleSubmit(event) {
        event.preventDefault();
        let post = [{id: this.state.id, title: this.state.title, text: this.state.text}];
        localStorage.setItem('post', JSON.stringify(post));
        this.setState({posts: post})
        this.closeModal();
    }

    handleFormId(event) {
        this.setState({id: event.target.value});
    }

    handleFormTitle(event) {
        this.setState({title: event.target.value});
    }

    handleFormText(event) {
        this.setState({text: event.target.value});
    }

    render() {
        if (this.state.showModal) {
            return (
                <>
                    <div className="modal">
                        <div className="modal__container">
                            <button onClick={this.closeModal} className="modal__button modal-close">Close</button>
                            <h2>Enter info for post</h2>
                            <form className="modal__form modal-form" onSubmit={this.handleSubmit}>
                                <input className="modal-form__number" type="number" name="post-id"
                                       placeholder="Enter unique post id" value={this.state.id}
                                       onChange={this.handleFormId}/>
                                <textarea className="modal-form__textarea" name="post-title"
                                          placeholder="Enter title post" value={this.state.title}
                                          onChange={this.handleFormTitle}/>
                                <textarea className="modal-form__textarea" name="post-text"
                                          placeholder="Enter text post" value={this.state.text}
                                          onChange={this.handleFormText}/>
                                <button type="submit" className="modal-form__submit"
                                        onClick={this.handleSubmit}>Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )
        } else {
            return (<></>);
        }
    }
}

export default ModalChild;