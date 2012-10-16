define(
    [
        "dojo/_base/declare",
        "modulesandpipes/modules/hellomodule/controller/SendMessageToHelloModuleCommand",
        "modulesandpipes/modules/hellomodule/controller/SendMessageToShellCommand",
        "modulesandpipes/modules/hellomodule/controller/SendRemoveSignalToShellCommand",
        "modulesandpipes/modules/hellomodule/controller/StartupCommand",
        "modulesandpipes/modules/hellomodule/controller/StoreMessageCommand",
        "modulesandpipes/modules/hellomodule/controller/TearDownCommand"
    ],
    function(declare, SendMessageToHelloModuleCommand, SendMessageToShellCommand,
             SendRemoveSignalToShellCommand, StartupCommand, StoreMessageCommand, TearDownCommand) {

        var HelloModuleFacade = declare([puremvc.Facade, org.puremvc.js.multicore.utilities.pipes.plumbing.PipeAware], {
        
            /**
             * Application Facade for Prattler Module.
             */
            constructor: function(/*String*/key) {
            },


            /**
             * Register Commands with the Controller
             */
            initializeController: function() {
                this.inherited(arguments);

                this.registerCommand(HelloModuleFacade.STARTUP, StartupCommand);
                this.registerCommand(HelloModuleFacade.TEARDOWN, TearDownCommand);
                this.registerCommand(HelloModuleFacade.SEND_REMOVE_SIGNAL_TO_SHELL, SendRemoveSignalToShellCommand);
                this.registerCommand(HelloModuleFacade.STORE_MESSAGE, StoreMessageCommand);
                this.registerCommand(HelloModuleFacade.SEND_MESSAGE_TO_SHELL, SendMessageToShellCommand);
                this.registerCommand(HelloModuleFacade.SEND_MESSAGE_TO_HELLO_MODULE, SendMessageToHelloModuleCommand);
            },


            /**
             * Application startup
             *
             * @param app a reference to the application component
             */
            startup: function(/*HelloModule*/ app) {
                this.sendNotification("startup", app);
            },


            /**
             * Accept an input pipe.
             * <P>
             * Registers an input pipe with this module's Junction.
             */
            acceptInputPipe: function(/*String*/name, /*PipeFitting*/pipe) {
                this.sendNotification(org.puremvc.js.multicore.utilities.pipes.plumbing.JunctionMediator.ACCEPT_INPUT_PIPE, pipe, name);
            },


            /**
             * Accept an output pipe.
             * <P>
             * Registers an input pipe with this module's Junction.
             */
            acceptOutputPipe: function(/*String*/name, /*PipeFitting*/pipe) {
                this.sendNotification(org.puremvc.js.multicore.utilities.pipes.plumbing.JunctionMediator.ACCEPT_OUTPUT_PIPE, pipe, name);
            }
        });

        /**
         * Notification name constants
         */
        HelloModuleFacade.STARTUP = "startup";
        HelloModuleFacade.TEARDOWN = "teardown";
        HelloModuleFacade.SEND_REMOVE_SIGNAL_TO_SHELL = "sendRemoveSignalToShell";
        HelloModuleFacade.STORE_MESSAGE = "storeMessage";
        HelloModuleFacade.SEND_MESSAGE_TO_SHELL = "sendMessageToShell";
        HelloModuleFacade.SEND_MESSAGE_TO_HELLO_MODULE = "sendMessageToHelloModule";

        /**
         * ApplicationFacade Factory Method
         */
        HelloModuleFacade.getInstance = function(/*String*/key) {
            if (!puremvc.Facade.instanceMap[key]) {
                puremvc.Facade.instanceMap[key] = new HelloModuleFacade(key);
            }
            return puremvc.Facade.instanceMap[key];
        }

        return HelloModuleFacade;
    }
);