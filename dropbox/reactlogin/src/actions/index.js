
export const GET_USER = 'GET_USER';
export const ADDFILE = 'ADDFILE';
export const DELETE_FILE = 'DELETE_FILE';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_FILES = 'GET_FILES';
export const GET_USERLOGS = 'GET_USERLOGS';

export function afterlogin(userdata) {

    return {
        type : GET_USER,
        payload : userdata
    }
};

export function getUserLog(userlogdata) {

    return {
        type : GET_USERLOGS,
        payload : userlogdata
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
