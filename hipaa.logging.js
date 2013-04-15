var logToConsole = true;
var logToDatabase = true;

var logFilter = "8"

LogLevel = {
    Emergency : 0,
    Alert : 1,
    Critical : 2,
    Error: 3,
    Warning: 4,
    Notice: 5,
    Info: 6,
    Debug: 7,
    Trace: 8,
    Hipaa: 9,
    Drawing: 10,
    Signpost: 11
}
parseLogLevel = function(int){
    switch(int){
        case 0:
            return "Emergency-> ";
        case 1:
            return "Alert-----> ";
        case 2:
            return "Critical--> ";
        case 3:
            return "Error-----> ";
        case 4:
            return "Warning---> ";
        case 5:
            return "Notice----> ";
        case 6:
            return "Info------> ";
        case 7:
            return "Debug-----> ";
        case 8:
            return "Stacktrace> ";
        case 9:
            return "Hipaa-----> ";
        case 10:
            return "Drawing---> ";
        case 11:
            return "Signpost--> ";
    }
}


log_hipaa_event = function(message, loglevel, owner){
    if(logToConsole){
        console.log(owner + ', LogLevel: ' + loglevel + " - "+ message);
    }
    if(logToDatabase){
        if(loglevel == LogLevel.Hipaa){
            Hipaa.insert({
                owner: owner,
                loglevel: loglevel,
                text: message,
                timestamp: new Date().getTime()
            });
        }
    }
}

log_event = function(message, loglevel, context){
    if(logToConsole){
        if(loglevel != logFilter){
            console.log(parseLogLevel(loglevel) + message);
        }
    }
}
catch_error = function(function_name, error, loglevel, context){
    if(logToConsole){
        console.log(parseLogLevel(loglevel) + function_name + " - " + error);
    }
}
