import { Levels,LogErrorDetails,GetRequestErrorLog,OptionalProperties,ErrorLog,Action,InfoLog } from "./LoggerTypes";

export const getGenerateErrorLog = (message:string) => (
    level: Levels,
    error: LogErrorDetails
): GetRequestErrorLog => ({
    level,
    error: {...error},
    message
});

export const generateLogFunctions = <SuccessDataType, ActionType extends Action>(
    action:ActionType,
    successLogMessage:string,
    failLogMessage:string
) => ({
    log: (successData: Record<OptionalProperties<ActionType>,SuccessDataType>) : InfoLog => ({
        action:{...action,...successData},
        level:'info',
        message: successLogMessage
    }),
    logError: (level: Levels, logError:LogErrorDetails): ErrorLog => ({
        action,
        level,
        error:logError,
        message:failLogMessage
    })
});