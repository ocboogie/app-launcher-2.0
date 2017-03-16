import * as React from 'react';
import { connect } from 'react-redux';

import { destroy } from '../actions/notify';


class NotifyCPNTC extends React.Component<any, any> {
    render() {
        if (this.props.activated) {
            setTimeout(() => {
                this.props.destroy();
            }, 1000)
            return (
                <div className="notify">{this.props.text}</div>
            )

        } else {
            return null
        }
    }
}

const mapStateToProps = (state: StoreJSON) => {
    return { 
        text: state.notify.text, 
        activated: state.notify.activated 
    }
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        destroy: () => {
            dispatch(destroy())
        }
    }
};
const NotifyCPNT = connect(mapStateToProps, mapDispatchToProps)(NotifyCPNTC);
export default NotifyCPNT;