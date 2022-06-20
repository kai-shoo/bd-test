export enum ActionKind {
    update = 'UPDATE',
    append = 'APPEND',
    clean = 'CLEAN',
    result = 'RESULT',
    default = 'DEFAULT',
}


export type State = {
    input: string | void;
    result?: string | number;
}


export type Action = {
    type: ActionKind,
    payload?: string | number,
}

