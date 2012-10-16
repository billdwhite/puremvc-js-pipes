define(
    [
        "dojo/_base/declare",
        "modulesandpipes/common/HelloMessage",
        "modulesandpipes/common/PipeNames",
        "modulesandpipes/modules/hellomodule/view/HelloModuleJunctionMediator",
        "modulesandpipes/modules/hellomodule/view/HelloModuleMediator"
    ],
    function(declare, HelloMessage, PipeNames, HelloModuleJunctionMediator, HelloModuleMediator) {

        var SendMessageToHelloModuleCommand = declare(puremvc.SimpleCommand, {

            /**
             * Send a message to another HelloModule.
             * <P>
             * Each HelloModule apply a filter on its input PIPE before accepting the message.
             * </P>
             * <P>
             * This command is triggered when an HelloModuleMessage has to be sent to
             * some other HelloModule. The HelloModuleMediator would have listen for
             * the notification and send the message by itself but a command helps
             * to understand the whole process.
             * </P>
             */
            execute: function(notification) {
                var helloModuleMediator = this.getFacade().retrieveMediator(HelloModuleMediator.NAME);
                var helloModuleJunctionMediator = this.getFacade().retrieveMediator(HelloModuleJunctionMediator.NAME);
                var fromModuleColor = helloModuleMediator.getModuleColor();
                var toModuleColor = notification.getType();
                var senderID = this.multitonKey;
                var body = notification.getBody();
                var helloModuleMessage = new HelloMessage({fromModuleColor:fromModuleColor, toModuleColor:toModuleColor, senderID:senderID, message:body});

                helloModuleJunctionMediator.sendMessage(PipeNames.HELLO_OUT_TO_HELLO, helloModuleMessage);
            }
        });

        return SendMessageToHelloModuleCommand;
    }
);