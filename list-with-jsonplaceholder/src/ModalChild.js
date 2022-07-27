import React from 'react';

class ModalChild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: (this.props.post['id'] !== false) ? this.props.post['id'] : '',
            title: (this.props.post['title'] !== false) ? this.props.post['title'] : '',
            body: (this.props.post['body'] !== false) ? this.props.post['body'] : '',
            errorMessageId: this.props.post['id'] ? '' : 'Choose unique post id',
            errorMessageTitle: this.props.post['title'] ? '' : 'Please enter the field',
            errorMessageBody: this.props.post['body'] ? '' : 'Please enter the field'
        }

        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormId = this.handleFormId.bind(this);
        this.handleFormTitle = this.handleFormTitle.bind(this);
        this.handleFormText = this.handleFormText.bind(this);
        this.checkFields = this.checkFields.bind(this);
    }

    closeModal() {
        this.props.status(false);
    }

    handleSubmit(event) {
        event.preventDefault();
        let post = [{id: this.state.id, title: this.state.title, body: this.state.body}];
        this.props.onChangePost(post);
        this.closeModal();
    }

    handleFormId(event) {
        let value = parseInt(event.target.value);
        if (event.target.value !== "undefined") {

            let items = this.props.allItems;
            let index = items.findIndex(item => item['id'] === value);
            if (index !== -1) {
                this.setState({
                    id: value,
                    errorMessageId: 'This ID is exist. Choose unique id or you will change post with this ID.',
                })
            } else {
                this.setState({
                    id: value, errorMessageId: '',
                });
            }
        } else {
            this.setState({
                id: value,
                errorMessageId: 'Choose unique post id',
            })
        }
    }

    handleFormTitle(event) {
        if (event.target.value) {
            this.setState({title: event.target.value, errorMessageTitle: ''});
        } else {
            this.setState({
                title: event.target.value,
                errorMessageTitle: 'Please enter the field',
            })
        }
    }

    handleFormText(event) {
        if (event.target.value) {
            this.setState({body: event.target.value, errorMessageBody: ''});
        } else {
            this.setState({title: event.target.value, errorMessageBody: 'Please enter the field'})
        }
    }

    checkFields() {
        return (this.state.id === undefined) || ((this.state.title === undefined) || (this.state.body === undefined));
    }

    render() {
        console.log(this.state);
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
                            <div className="error-message">{this.state.errorMessageId}</div>
                            <textarea className="modal-form__textarea" name="post-title"
                                      placeholder="Enter title post" value={this.state.title}
                                      onChange={this.handleFormTitle}/>
                            <div className="error-message">{this.state.errorMessageTitle}</div>
                            <textarea className="modal-form__textarea" name="post-text"
                                      placeholder="Enter text post" value={this.state.body}
                                      onChange={this.handleFormText}/>
                            <div className="error-message">{this.state.errorMessageBody}</div>
                            <button type="submit" className="modal-form__submit"
                                    onClick={this.handleSubmit} disabled={this.checkFields()}>Submit
                            </button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default ModalChild;