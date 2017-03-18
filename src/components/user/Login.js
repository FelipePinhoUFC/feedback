import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import { authDispatchers } from 'api/actions';

class Login extends React.Component {

    onSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.login();
    }

    onChange = ({ target: { name, value } }) => {
        this.props.onChange({
            [name]: value,
        });
    }

    render() {
        const { auth } = this.props;
        const errors = auth.getIn(['emailSignIn', 'default', 'errors']);
        const user = auth.getIn(['emailSignIn', 'default', 'form']);
        const errorContainer = errors.toList().map((value, key) => (
            <div key={key}>{value}</div>
        )).toJS();

        return (
            <div>
              <div className="errors">{errorContainer}</div>
              <form onSubmit={this.onSubmit}>
                <label htmlFor="email">Email</label>
                <input onChange={this.onChange} value={user.get('email')} className="" name="email" type="text" /> <br />
                <label htmlFor="password">Password</label>
                <input onChange={this.onChange} value={user.get('password')} name="password" type="password"/><br />
                <button onClick={this.onSubmit}>Login</button>
              </form>
            </div>
        );
    }
}

export default connect(({ auth }) => ({ auth }), authDispatchers)(Login);