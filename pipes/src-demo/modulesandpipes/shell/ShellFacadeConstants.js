define(
    [
        "dojo/_base/declare"
    ],
    function(declare) {

        var ShellFacadeConstants = declare(null, {});

        ShellFacadeConstants.HELLO_MODULE_URI = "modulesandpipes/modules/hellomodule/view/components/HelloModule";
        ShellFacadeConstants.STARTUP = 'startup';
        ShellFacadeConstants.CONNECT_MODULE_TO_SHELL = 'connectModuleToShell';
        ShellFacadeConstants.CONNECT_HELLO_MODULE_TO_HELLO_MODULE = 'connectHelloModuleToHelloModule';
        ShellFacadeConstants.DISCONNECT_HELLO_MODULE_FROM_HELLO_MODULE = 'disconnectHelloModuleFromHelloModule';
        ShellFacadeConstants.DISCONNECT_MODULE_FROM_SHELL = 'disconnectHelloModuleFromShell';
        ShellFacadeConstants.CONNECT_SHELL_TO_HELLO_MODULE = 'connectShellToHelloModule';
        ShellFacadeConstants.ADD_HELLO_MODULE = 'addHelloModule';
        ShellFacadeConstants.REMOVE_HELLO_MODULE = 'removeHelloModule';
        ShellFacadeConstants.SEND_MESSAGE_TO_ALL_HELLO_MODULES = 'sendMessageToAllHelloModules';
        ShellFacadeConstants.ADD_HELLO_MESSAGE = 'addHelloMessage';
        ShellFacadeConstants.ADD_HELLO_MODULE = 'addHelloModule';
        ShellFacadeConstants.HELLO_ALL = 'helloAllFromShell';

        return ShellFacadeConstants;
    }
);