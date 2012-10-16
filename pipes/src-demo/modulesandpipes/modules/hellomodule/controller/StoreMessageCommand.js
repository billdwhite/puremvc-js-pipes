define(
    [
        "dojo/_base/declare",
        "modulesandpipes/modules/hellomodule/model/HelloMessageProxy"
    ],
    function(declare, HelloMessageProxy) {

        var StoreMessageCommand = declare(puremvc.SimpleCommand, {

            /**
             * Add a received message to the module list of message.
             * <P>
             * This command is triggered when an HelloModuleMessage comes in, and adds
             * it to the MessageProxy. The HelloMessageProxy uses an ArrayCollection
             * for its list, so any UI controls listening to it will be updated
             * automatically.
             * </P>
             */
            execute: function(notification) {
                var proxy = this.getFacade().retrieveProxy(HelloMessageProxy.NAME);
                proxy.addMessage(notification.getBody());
            }
        });

        return StoreMessageCommand;
    }
);