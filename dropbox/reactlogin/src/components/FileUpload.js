import React, {Component} from 'react';
import * as API from '../api/API';
import FileGridList from "./FileGridList";
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import {connect} from 'react-redux';
import {addFile} from "../actions/index";
import {deleteFile} from "../actions/index";
import RightNavBar from "./RightNavBar";
import LeftNavBar from "./LeftNavBar";
import {afterlogin} from "../actions/index";
import {getFiles} from "../actions/index";
import Header from "./Header";
import { Route, withRouter } from 'react-router-dom';



class FileUpload extends Component {

    state = {
        message: '',
        fileparent:''
    };

    componentWillMount(){
        //const data=localStorage.getItem("email")
        API.getState()
            .then((res) => {

                if (res.status == 201) {
                    this.props.afterlogin(res.userdetails);
                    this.props.getFiles(res.userdetails.files);
                    console.log("Success...")

                }else if (res.status == 401) {

                    this.props.history.push('/');
                }
            });
    }

    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('file', event.target.files[0]);
      //  payload.append('email', this.props.userdata.email);
        payload.append('fileparent', this.state.fileparent);
        payload.append('isfile', 'T');

        API.uploadFile(payload)
        .then((res) => {

            if (res.status == 204) {

                this.props.addFile(res.filedata);
                this.setState({

                    message: "File uploaded successfully"
                });
            }else if (res.status == 401) {
                this.setState({

                    message: "File error"
                });
            }
        });
    };

    deleteFile=(index, file) => {


        API.deleteFile(file)
            .then((res) => {

                if (res.status == 204) {

                    console.log("Delete success")
                    this.props.deleteFile(index);
                    this.setState({

                        message: "File deleted successfully"
                    });
                }else if (res.status == 401) {
                    this.setState({

                        message: res.message
                    });
                }
                else if (res.status == 402) {
                    this.setState({

                        message: res.message
                    });
                }
            });

    }

    makeFolder=(folder) => {

        API.makeFolder(folder)
            .then((res) => {

                if (res.status == 204) {

                    this.props.addFile(res.folderdata);
                    this.setState({

                        message: "folder created successfully"
                    });

                }else if (res.status == 401) {
                    this.setState({

                        message: "Folder error"
                    });
                }
            });

    }
/*

    share=(filedata) => {

        if(filedata.isfile=='T')
            this.sharefile(filedata)
        else
            this.sharefolder(filedata)
    }

    sharefolder=(folderdata) => {


        var emailList=folderdata.shareEmail.trim().split(';');

        console.log(emailList)

        for (var key in emailList) {

            const data = {folderdata: folderdata.file, shareEmail: emailList[key]}

            API.shareFolder(data)
                .then((res) => {

                    if (res.status == 201) {
                        console.log(data)
                        this.setState({

                            message: this.state.message+" Folder Shared with "+data.shareEmail+"!"
                        });
                        console.log("Success...")

                    } else if (res.status == 401) {
                        console.log("here")
                        this.setState({

                            message: this.state.message+" "+data.shareEmail+" does not exist!"
                        });
                    }
                });
        }

    }
*/


    sharefile=(filedata) => {


        var emailList=filedata.shareEmail.trim().split(';');

        console.log(emailList)

        for (var key in emailList) {

            const data = {filedata: filedata.file, shareEmail: emailList[key]}

            API.shareFile(data)
                .then((res) => {

                    if (res.status == 201) {
                        console.log(data)
                        this.setState({

                            message: this.state.message+" File Shared with "+data.shareEmail+"!"
                        });
                        console.log("Success...")

                    } else if (res.status == 401) {
                        console.log("here")
                        this.setState({

                            message: this.state.message+" "+data.shareEmail+" does not exist!"
                        });
                    }
                });
        }

    }

    makeSharedFolder=(data) => {
/*console.log(data)
        const folderData={folder:data, email:this.props.userdata.email}*/
        API.makeFolder(data)
            .then((res) => {

                console.log(res.folderdata)
                if (res.status == 204) {

                    this.props.addFile(res.folderdata);
                    const shareddata={file:res.folderdata, shareEmail:data.shareEmail}
                    this.sharefile(shareddata)
                    this.setState({

                        message: "folder created successfully"
                    });

                }else if (res.status == 401) {
                    this.setState({

                        message: "Folder error"
                    });
                }
            });

    }


    openFileFolder=(filedata) =>{

        if(filedata.isfile=='F'){

            this.setState({
                 fileparent:filedata.filepath
             });

            API.getFileList(filedata.filepath)
                .then((res) => {
                if (res.status == 201) {

                    this.props.getFiles(res.files);

                }else if (res.status == 401) {


                }


            });

        }


        else{


            API.getFile(filedata.filepath)
                .then((res) => {
                    console.log("hello");
                console.log(res);


                });
        }
        console.log(this.state.fileparent);

    }

    navigateHome(){

        API.getState()
            .then((res) => {

                if (res.status == 201) {

                    this.props.getFiles(res.userdetails.files);
                    console.log("Success...")

                }else if (res.status == 401) {

                    this.props.history.push('/');
                }
            });

    }

    render() {


        console.log(this.state.fileparent);
        return (



            <div className="container-fluid">
                <Header/>

                { this.state.message===''?'':(
                    <div className="text-danger">
                        {this.state.message}
                    </div>)
                }

            <div className="jumbotron">

                <div className="row justify-content-md-center">


                <TextField

                    type="file"
                    name="mypic"
                    onChange={this.handleFileUpload}
                />
                </div>
                <br/><br/>

                <div className="container-fluid">
                    <div className="row">

                        <div className="col-sm-7 ">
                            <a href="#" className="link-title "
                               onClick={() => this.navigateHome()}>
                                Dropbox
                            </a>
                        </div>
                    </div>

                    <div className="row">
                        <LeftNavBar userdetails={this.userdetails}/>
                        <div className="col-sm-1 "></div>
                        <FileGridList files={this.props.filesdata.files}
                                      deleteFile={this.deleteFile}
                                      sharefile={this.sharefile}
                                      openFileFolder={this.openFileFolder}
                                      parentFile={this.state.fileparent}
                                      userEmail={this.props.userdata.email}/>
                        <div className="col-sm-1 "></div>
                        <RightNavBar makeFolder={this.makeFolder}
                                     makeSharedFolder={this.makeSharedFolder}
                                     parentFile={this.state.fileparent}/>
                    </div>
                </div>

            </div>


</div>


        );
    }
}



function mapStateToProps(reducerdata) {
    console.log(reducerdata);
    const userdata = reducerdata.userreducer;
    const filesdata = reducerdata.filesreducer;
    return {userdata, filesdata};
}

function mapDispatchToProps(dispatch) {
    return {

        addFile : (data) => dispatch(addFile(data)),
        deleteFile : (index) => dispatch(deleteFile(index)),
        afterlogin : (data) => dispatch(afterlogin(data)),
        getFiles : (data) => dispatch(getFiles(data))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileUpload));


