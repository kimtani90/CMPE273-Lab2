import React, {Component} from 'react';
import * as API from '../api/API';
import '../Login.css';
import PropTypes from 'prop-types';
import dropbox from "./dropboxplus.gif";
import {connect} from 'react-redux';
import {Row,Col,ListGroupItem} from 'react-bootstrap';
import {afterlogin} from "../actions/index";
import { Route, withRouter } from 'react-router-dom';
import Header from "./Header";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import {getUserLog} from "../actions/index";


class UserLog extends Component {

    componentWillMount(){

        API.getState()
            .then((res) => {

                if (res.status == 201) {
                    console.log(res.userdetails)
                    this.props.getUserLog(res.userdetails.userlog);
                    console.log("Success...")

                }else if (res.status == 401) {

                    this.props.history.push('/');
                }
            });
    }

    render() {

        return (
            <div>
                <Header/>
            <div className="jumbotron">
                <div className="container-fluid row justify-content-md-center">

                    <div className="account-wall col-md-10">
                        <div className="col-md-12">

                            <h2>User Log</h2>

                            <ReactTable
                                data={this.props.userlogdata.userLog}
                                columns={[
                                    {
                                        Header: "File Name",
                                        columns: [
                                            {
                                                accessor: "filename"
                                            }
                                        ]
                                    },

                                    {
                                        Header: "File Path",
                                        columns: [
                                            {
                                                accessor: "filepath"
                                            }
                                        ]
                                    },

                                    {
                                        Header: "File Type",
                                        columns: [
                                            {
                                                accessor: "isfile"
                                            }
                                        ]
                                    },

                                    {
                                        Header: "Activity",
                                        columns: [
                                            {
                                                accessor: "action"
                                            }
                                        ]
                                    },

                                    {
                                        Header: "Activity Time",
                                        columns: [
                                            {
                                                accessor: "actiontime"
                                            }
                                        ]
                                    }

                                ]}
                                defaultPageSize={5}
                                className="-striped -highlight"
                            />


                    </div>
                        <br/>
                        <button className="btn btn-primary" type="submit"
                                onClick={() => this.props.history.push("/files")}>
                            Back
                        </button>
                    </div>

                </div>
            </div>
            </div>
        );
    }
}


function mapStateToProps(reducerdata) {
console.log(reducerdata )
    const userlogdata = reducerdata.userlogreducer;
    return {userlogdata};
}

function mapDispatchToProps(dispatch) {
    return {

        getUserLog : (data) => dispatch(getUserLog(data))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserLog));