import React, {Component} from 'react';
import {Row,Col,ListGroupItem} from 'react-bootstrap';
import Modal from 'react-modal';
import '../FileUpload.css';
import { Route, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import * as API from '../api/API';
import {deleteGroup} from "../actions/index";

import {getGroups} from "../actions/index";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


class ListMembers extends Component {

    state = {message:''}

    deleteMember(index, member){

        API.deleteMember(member)
            .then((res) => {

                console.log(res)
                if (res.status == 201) {
                    this.props.deleteMember(index);
                    this.setState({ message: res.message })
                    console.log("Success...")

                }else if (res.status == 401) {

                    this.props.history.push('/');
                }
            });
    }

    render() {
        console.log(this.props.groupdata)
        return (

            <div className="col-sm-6">

                <table className="table table-striped table-condensed table-hover table-bordered">
                    <thead>
                    <tr className="justify-content-md-left">

                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Group</th>

                    </tr>
                    </thead>

                    <tbody>
                    {this.props.groupdata.groups.map((group, index) => {

                        return (
                            <tr className="justify-content-md-left">

                                <td>
                                    <div className="row justify-content-md-left">
                                        <div className="col-md-1">&#9733;</div>
                                        {/*{/!*<div>&#9734;</div>*!/}*/}


                                    </div>
                                </td>
                                <td>
                                    <a href="#" className="link-title "
                                       onClick={/!*() => this.props.openGroup(group)*!/}>*/>
                                        {group.groupname}
                                    </a>
                                </td>
                                <td>
                                    {group.membercount}
                                </td>
                                <td>
                                    {group.owner}
                                </td>

                                <td>
                                    <button className="btn btn-primary" type="submit"
                                            onClick={() => this.deleteGroup(index, group)}>
                                        Delete
                                    </button>
                                </td>


                            </tr>
                        );
                    })}

                    </tbody>
                </table>

            </div>


        );
    }



}


function mapStateToProps(reducerdata) {
    console.log(reducerdata);
    const groupdata = reducerdata.groupreducer;
    console.log(groupdata)
    return {groupdata};
}

function mapDispatchToProps(dispatch) {
    return {

        deleteGroup : (index) => dispatch(deleteGroup(index)),
        getGroups : (data) => dispatch(getGroups(data))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListMembers));


