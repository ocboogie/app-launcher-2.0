import * as React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

import GridCPNT from './grid';
import NotifyCPNT from './notify';
import { backGrid, loadGrid } from '../actions/grid';
import store from '../store';


class LayoutC extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e: any) {
        store.dispatch(backGrid());
        // activeGrid.back(true)
        // if (activeGrid.properties.root) {
        //     ipcRenderer.send("hide");
        // } else {
        //     gridBack();
        // }
    }

    render() {
        return (
            <div onContextMenu={this.handleClick} className="app" style={this.props.style}>
                <NotifyCPNT />
                <GridCPNT />
            </div>
        );
    }
}
const mapStateToProps = (state: StoreJSON) => ({ style: state.config.style});
const Layout = connect(mapStateToProps)(LayoutC);
export default Layout;