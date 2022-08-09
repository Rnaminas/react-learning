import React from 'react';

class ModalChild extends React.Component {
    state = {
        title: '',
        body: '',
    }

    componentDidMount() {
        if (this.props.modalType === 'add') {
            this.setState({
                title: '', body: ''
            });
        } else {
            this.setState({title: this.props.modalContent.title, body: this.props.modalContent.body});
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const post = {id: Math.random(), title: this.state.title, body: this.state.body};
        this.props.onChangePost(post, this.props.modalType);
    }

    handleForm = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    checkFields = () => {
        return !this.state.title || !this.state.body;
    }

    render() {
        const {body, title} = this.state;
        return (
            <div className="modal">
                <div className="modal__container">
                    <button onClick={() => this.props.closeModal()} className="modal__button modal-close">Close
                    </button>
                    <h2>Enter info for post</h2>
                    <form className="modal__form modal-form" onSubmit={this.handleSubmit}>
                            <textarea className="modal-form__textarea" name="title"
                                      placeholder="Enter title post" value={title}
                                      onChange={this.handleForm}/>
                        <div className="error-message">{title ? '' : 'Please enter the field'}</div>
                        <textarea className="modal-form__textarea" name="body"
                                  placeholder="Enter text post" value={body}
                                  onChange={this.handleForm}/>
                        <div className="error-message">{body ? '' : 'Please enter the field'}</div>
                        <button type="submit" className="modal-form__submit"
                                onClick={this.handleSubmit} disabled={this.checkFields()}>Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ModalChild;