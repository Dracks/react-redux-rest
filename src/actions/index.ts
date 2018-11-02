import { fetchAction, saveAction, deleteAction } from './actions';
export const actions = {
    fetch: fetchAction,
    save: saveAction,
    delete: deleteAction,
}

import { whenComplete, compose, saga } from './handlers';
export const handlers = {
    whenComplete,
    compose,
    saga
}

import { responseReloadAction, responseAction } from './response';
export const responseActions = {
    reload: responseReloadAction,
    normal: responseAction
}