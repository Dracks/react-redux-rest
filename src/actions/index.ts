import { fetchAction, saveAction, deleteAction } from './Actions';
export const actions = {
    fetch: fetchAction,
    save: saveAction,
    delete: deleteAction,
}

import { whenComplete, compose } from './handlers';
export const handlers = {
    whenComplete,
    compose,
}

import { responseReloadAction, responseAction } from './response';
export const responseActions = {
    reload: responseReloadAction,
    normal: responseAction
}