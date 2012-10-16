define(
    [
        "dojo/_base/declare",
        "modulesandpipes/common/HelloMessage",
        "modulesandpipes/common/PipeNames",
        "modulesandpipes/modules/hellomodule/view/HelloModuleJunctionMediator",
        "modulesandpipes/modules/hellomodule/view/HelloModuleMediator"
    ],
    function(declare, HelloMessage, PipeNames, HelloModuleJunctionMediator, HelloModuleMediator) {

        var SendMessageToShellCommand = declare(puremvc.SimpleCommand, {
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
                var helloModuleMediator = this.getFacade().retrieveMediator(HelloModuleMediator.NAME);
                var helloModuleJunctionMediator = this.getFacade().retrieveMediator(HelloModuleJunctionMediator.NAME);
                var fromModuleColor = helloModuleMediator.getModuleColor();
                var senderID = this.multitonKey;
                var body = notification.getBody();
                // The shell is not an HelloModule. It does not need any toModuleColor argument. We let it null.
                var helloModuleMessage = new HelloMessage({
                    fromModuleColor: fromModuleColor,
                    toModuleColor: null,
                    senderID: senderID,
                    message: body
                });
                helloModuleJunctionMediator.sendMessage(PipeNames.ANY_MODULE_TO_SHELL, helloModuleMessage);
            }
        });

        return SendMessageToShellCommand;
    }
);