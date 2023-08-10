
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Logs {
    id?: Nullable<string>;
    name?: Nullable<string>;
    message?: Nullable<string>;
}

export interface IQuery {
    getAllLogss: Logs[];
}

export interface IMutation {
    addLogs: Logs;
}

type Nullable<T> = T | null;
