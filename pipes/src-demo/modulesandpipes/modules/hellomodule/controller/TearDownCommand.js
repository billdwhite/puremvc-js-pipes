define(
    [
        "dojo/_base/declare",
        "modulesandpipes/modules/hellomodule/view/HelloModuleJunctionMediator"
    ],
    function(declare, HelloModuleJunctionMediator) {

        var TearDownCommand = declare(puremvc.SimpleCommand, {
            /**
             * Send a message to the shell.
             * <P>
             * This command is triggered when an HelloModuleMessage has to be sent to
             * the shell. The HelloModuleMediator would have listen for the notification
             * and send the message by itself but a command helps to understand the
             * whole process.
             * </P>
             */
            execute: function(notification) {
                var helloModuleJunctionMediator = this.getFacade().retrieveMediator(HelloModuleJunctionMediator.NAME);
                helloModuleJunctionMediator.tearDown();
                // definitively removes the PureMVC core used to manage this module.
                puremvc.Facade.removeCore(this.multitonKey);
            }
        });

        return TearDownCommand;
    }
);