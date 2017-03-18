import actions from 'api/actions';
import { push } from 'react-router-redux';

export default (store) => {
    return (dispatch) => {
        return (action) => {

            if (action.type === actions.user.register) {
                const { auth } = store.getState();
                const user = auth.getIn(['emailSignIn', 'default', 'form']);
                const { email, password } = user.toJS();
                window.firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(payload => {
                        store.dispatch(push('/login'));
                    })
                    .catch(payload => {
                        console.log(payload);
                        store.dispatch({ type: actions.user.registerFailure, payload })
                    });
            }

            if (action.type === actions.user.login) {
                const { auth } = store.getState();
                const user = auth.getIn(['emailSignIn', 'default', 'form']);
                const { email, password } = user.toJS();
                window.firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(payload => {
                        store.dispatch({ type: actions.user.logged, payload: { user } })
                    })
                    .catch(payload => {
                        console.log(payload);
                        store.dispatch({ type: actions.user.loginFailure, payload })
                    });
            }

            if (action.type === actions.user.logged) {
                store.dispatch(push('/profile'));
            }

            return dispatch(action);
        }
    }
}
