
export const GET_USER = 'GET_USER';
export const ADDFILE = 'ADDFILE';
export const DELETE_FILE = 'DELETE_FILE';

export const GET_GROUPS = 'GET_GROUPS';
export const ADD_GROUP = 'ADD_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';

export const UPDATE_USER = 'UPDATE_USER';
export const GET_FILES = 'GET_FILES';
export const GET_FILELOG = 'GET_FILELOG';
export const GET_GROUPLOG = 'GET_GROUPLOG';


export function getGroups(groupdata) {

    return {
        type : GET_GROUPS,
        payload : groupdata
    }
};


export function addGroup(groupdata) {

    return {
        type : ADD_GROUP,
        payload : groupdata
    }
};


export function deleteGroup(index) {

    return {
        type : DELETE_GROUP,
        payload : index
    }
};
export function afterlogin(userdata) {

    return {
        type : GET_USER,
        payload : userdata
    }
};

export function getFileLog(filelogdata) {

    return {
        type : GET_FILELOG,
        payload : filelogdata
    }
};

export function getGroupLog(grouplogdata) {

    return {
        type : GET_GROUPLOG,
        payload : grouplogdata
    }
};

export function getFiles(filedata) {

    return {
        type : GET_FILES,
        payload : filedata
    }
};


export function addFile(filedata) {

    return {
        type : ADDFILE,
        payload : filedata
    }
};


export function deleteFile(index) {

    return {
        type : DELETE_FILE,
        payload : index
    }
};


export function updateUser(data) {

    return {
        type : UPDATE_USER,
        payload : data
    }
};
