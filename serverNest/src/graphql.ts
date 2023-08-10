
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Task {
    id?: Nullable<string>;
    name?: Nullable<string>;
    message?: Nullable<string>;
}

export interface IQuery {
    getAllTasks: Task[];
}

export interface IMutation {
    addTask: Task;
    editTask: Task;
    removeTask: Task;
}

type Nullable<T> = T | null;
