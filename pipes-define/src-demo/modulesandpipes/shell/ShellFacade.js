define(
    [
        "dojo/_base/declare",
        "modulesandpipes/shell/controller/AddHelloModuleCommand",
        "modulesandpipes/shell/controller/RemoveHelloModuleCommand",
        "modulesandpipes/shell/controller/StartupCommand"
    ],
    function(declare, AddHelloModuleCommand, RemoveHelloModuleCommand, StartupCommand) {

        var ShellFacade = declare(puremvc.Facade, {

            /**
             * Concrete Facade for the Main App / Shell.
             */


            /**
             * Register Commands with the Controller.
             */
            initializeController: function() {
                this.inherited(arguments);

                this.registerCommand(ShellFacade.STARTUP, StartupCommand);
                this.registerCommand(ShellFacade.ADD_HELLO_MODULE, AddHelloModuleCommand);
                this.registerCommand(ShellFacade.REMOVE_HELLO_MODULE, RemoveHelloModuleCommand);
            },


            /**
             * Application startup
             *
             * @param app
             *         A reference to the application component
             */
            startup: function(/*Shell*/app) {
                this.sendNotification(ShellFacade.STARTUP, app);
            }
        });

        ShellFacade.HELLO_MODULE_URI = "modulesandpipes/modules/hellomodule/view/components/HelloModule";
        ShellFacade.STARTUP = 'startup';
        ShellFacade.CONNECT_MODULE_TO_SHELL = 'connectModuleToShell';
        ShellFacade.CONNECT_HELLO_MODULE_TO_HELLO_MODULE = 'connectHelloModuleToHelloModule';
        ShellFacade.DISCONNECT_HELLO_MODULE_FROM_HELLO_MODULE = 'disconnectHelloModuleFromHelloModule';
        ShellFacade.DISCONNECT_MODULE_FROM_SHELL = 'disconnectHelloModuleFromShell';
        ShellFacade.CONNECT_SHELL_TO_HELLO_MODULE = 'connectShellToHelloModule';
        ShellFacade.MODULE_LOADED = 'moduleLoaded';
        ShellFacade.MODULE_UNLOADED = 'moduleUnLoaded';
        ShellFacade.ADD_HELLO_MODULE = 'addHelloModule';
        ShellFacade.REMOVE_HELLO_MODULE = 'removeHelloModule';
        ShellFacade.SEND_MESSAGE_TO_ALL_HELLO_MODULES = 'sendMessageToAllHelloModules';
        ShellFacade.ADD_HELLO_MESSAGE = 'addHelloMessage';

        ShellFacade.getInstance = function(key) {
            if (!puremvc.Facade.instanceMap[key]) {
                puremvc.Facade.instanceMap[key] = new ShellFacade(key);
            }
            return puremvc.Facade.instanceMap[key];
        };

        return ShellFacade;
    }
);