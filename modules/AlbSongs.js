import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
require('../style/app.scss');

class App extends Component {

    componentWillMount(){

        const { dispatch } = this.props;




    }


    render() {

        const { singles } = this.props;


        return (
            <div>



            </div>
        )
    }
}




function mapStateToProps(state) {
    // console.log('state');
    // console.log(state);
    return {
        singles: state.loadSingles
    }
}


export default connect(mapStateToProps)(App)
