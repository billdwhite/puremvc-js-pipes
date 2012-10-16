define(
    [
        "dojo/_base/declare"
    ],
    function(declare) {

        var HelloModuleConstants = declare(null, {});

        HelloModuleConstants.serial = 0;
        HelloModuleConstants.NAME = "HelloModule";
        HelloModuleConstants.REMOVE_MODULE = "removeModule";
        HelloModuleConstants.TEARDOWN = "teardown";
        HelloModuleConstants.HELLO_SHELL = "helloShell";
        HelloModuleConstants.HELLO_ALL = "helloAllFromModule";
        HelloModuleConstants.HELLO_RED = "helloRed";
        HelloModuleConstants.HELLO_GREEN = "helloGreen";
        HelloModuleConstants.HELLO_BLUE = "helloBlue";

        HelloModuleConstants.STARTUP = "startup";
        HelloModuleConstants.SEND_REMOVE_SIGNAL_TO_SHELL = "sendRemoveSignalToShell";
        HelloModuleConstants.STORE_MESSAGE = "storeMessage";
        HelloModuleConstants.SEND_MESSAGE_TO_SHELL = "sendMessageToShell";
        HelloModuleConstants.SEND_MESSAGE_TO_HELLO_MODULE = "sendMessageToHelloModule";

        return HelloModuleConstants;
    }
);