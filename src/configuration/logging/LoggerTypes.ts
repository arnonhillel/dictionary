export type Levels = 'info' | 'debug' | 'warn' |'error';

export const SERVICE_NAME = 'service-name';

export enum ActionTypes {
    someAction='someAction'
}

export enum EntityTypes {
    someEntity='someEntity'
}

export type OptionalProperties<T extends object> = {
    [K in keyof T] : T extends Record<K, T[K]> ? never : K;
}[keyof T];

export interface SomeAction {
    type : ActionTypes.someAction,
    entity : EntityTypes.someEntity
}

export type Action= SomeAction;

export interface LogErrorDetails {
    errorMessage: string;
    stacktrace?:string;
}

export interface RouteSpecificLogDetails {
    level: Levels;
    message:string;
    action : Action;
    tags?: string[];
}

export type InfoLog = RouteSpecificLogDetails;

export interface ErrorLog extends RouteSpecificLogDetails {
    error: LogErrorDetails;
}

export type GetRequestErrorLog = Omit<ErrorLog,'action'>;

export interface Log extends RouteSpecificLogDetails {
    request: {
        id:string;
        method:string;
        requestedUrl:string;
    };
    response: {
        status: number;
        executionTime:number;
    };
    service: typeof SERVICE_NAME;
}