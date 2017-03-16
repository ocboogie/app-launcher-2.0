import * as React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

import GridCPNT from './grid';
import NotifyCPNT from './notify';
import { backGrid, loadGrid } from '../actions/grid';

class LayoutC extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e: any) {
        this.props.backGrid();
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

const mapStateToProps = (state: StoreJSON) => ({ style: state.config.style });

const mapDispatchToProps = (dispatch: any) => {
    return {
        backGrid: () => {
            dispatch(backGrid())
        }
    }
};

const Layout = connect(mapStateToProps, mapDispatchToProps)(LayoutC);
export default Layout;