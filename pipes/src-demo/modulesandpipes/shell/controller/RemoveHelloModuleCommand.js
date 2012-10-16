define(
    [
        "dojo/_base/declare",
        "modulesandpipes/shell/ShellFacadeConstants",
        "modulesandpipes/shell/view/ShellMediator"
    ],
    function(declare, ShellFacade, ShellMediator) {

        var RemoveHelloModuleCommand = declare(puremvc.SimpleCommand, {
            /**
             * The new module is unreferenced from its PureMVC core and removed from the display list.
             * <P>
             * When no more instance of the module are displayed in the shell the module file is unloaded from memory.
             * </P>
             */
            execute: function(notification) {

                var helloModuleID = notification.getBody();

                /*
                 * Each *HelloModuleJunctionMediator* object handle this
                 * notification. So each loaded HelloModule will disconnect input
                 * and output pipes from the module actually removed.
                 */
                this.sendNotification(ShellFacade.DISCONNECT_HELLO_MODULE_FROM_HELLO_MODULE, helloModuleID);

                /*
                 * Disconnect input and output pipes between the shell and the module.
                 */
                this.sendNotification(ShellFacade.DISCONNECT_MODULE_FROM_SHELL, helloModuleID);

                var moduleMediator = this.getFacade().retrieveMediator(helloModuleID);
                moduleMediator.tearDown();
                this.getFacade().removeMediator(helloModuleID);

                //Remove the HelloModule view instance from the shell display list.
                var shellMediator = this.getFacade().retrieveMediator(ShellMediator.NAME);
                shellMediator.removeHelloModule(helloModuleID);

                /*
                 * If the module is the last of the list we unload its module file
                 * from memory.
                 */
                if (shellMediator.moduleListEmpty()) {
                    this.sendNotification(ShellFacade.UNLOAD_MODULE, ShellFacade.HELLO_MODULE_URI);
                }
            }
        });

        return RemoveHelloModuleCommand;
    }
);