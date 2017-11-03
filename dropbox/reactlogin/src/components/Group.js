import React, {Component} from 'react';
import {Row,Col,ListGroupItem} from 'react-bootstrap';
import Modal from 'react-modal';
import '../FileUpload.css';
import ListGroup from "./ListGroup";
import { Route, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import Header from "./Header";


class Group extends Component {


    state = { isModalOpen: false, shareEmail:'', file:'' , group:[], downloadLink:''}

    style = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };

    render(){


        return (





            <div className="container-fluid">
                <Header/>

                {/*{ this.state.message===''?'':(
                    <div className="text-danger">
                        {this.state.message}
                    </div>)
                }
*/}
                <div className="jumbotron">



                    <div className="container-fluid">


                        <div className="row">
                            {/*<LeftNavBar userdetails={this.userdetails}/>*/}
                            <div className="col-sm-3"></div>
                            <ListGroup/>
                            <div className="col-sm-1 "></div>
                            {/*<RightNavBar makeFolder={this.makeFolder}
                                         makeSharedFolder={this.makeSharedFolder}
                                         parentFile={this.state.fileparent}/>*/}
                        </div>
                    </div>

                </div>


            </div>



        );
    }


}


export default Group;
