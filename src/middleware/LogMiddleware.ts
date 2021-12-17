import { Request, Response, NextFunction, request, response } from "express";
import { RouteSpecificLogDetails, Log, SERVICE_NAME } from "../../src/configuration/logging/LoggerTypes";
import { CustomRequestHeaders } from "../../src/configuration/Configuration";

const HEALTH_ROUTE = '/health';

const generateLog = (
    requestDetails: Log['request'],
    responseDetails: Log['response'],
    logDetails: Partial<RouteSpecificLogDetails>
): Partial<Log> => ({
    ...logDetails,
    request: requestDetails,
    response:responseDetails,
    service: SERVICE_NAME
});

const parseRequest = (request: Request) : Log['request'] => ({
    id:request.headers[CustomRequestHeaders.requestId] as string,
    method: request.method,
    requestedUrl: request.originalUrl
});

const parseResponse = (response: Response, executionTime:number): Log['response'] => ({
    executionTime,
    status: response.statusCode
});

const generateLogDetails = (response: Response): Partial<RouteSpecificLogDetails> =>{
    const {logDetails} = response.locals;

    if(logDetails) return logDetails;

    return {level:'debug',message:'intercepted request'};
}

export const getLogMiddleware = () => (request:Request, response :Response, next:NextFunction) =>{
    const startTime: number = new Date().getTime();

    response.on('finish', ()=>{
        if(request.baseUrl !== HEALTH_ROUTE) {
            const executionTime: number = new Date().getTime() - startTime;

            const requestDetails = parseRequest(request);
            const responseDetails = parseResponse(response, executionTime);

            const logDetails = generateLogDetails(response);

            const log = generateLog(requestDetails,responseDetails,logDetails);

            console.log(log);

        }
    });
    
    next();
}