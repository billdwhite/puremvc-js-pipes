define(
    [
        "dojo/_base/declare",
        "modulesandpipes/common/HelloMessage"
    ],
    function(declare, HelloMessage) {

        var HelloMessageProxy = declare(puremvc.Proxy, {

            messages: null,


            /**
             * The HelloModule list of messages proxy.
             * <P>
             * Maintains the list of <code>HelloMessage</code>. This class could
             * be extended to write logmessages to a remote service as well.
             * </P>
             * <P>
             * An <code>ArrayCollection</code> is used to hold the messages because it
             * will be used as a data provider for UI controls, which will
             * automatically be refreshed when the contents of the ArrayCollection
             * changes.
             * </P>
             */
            constructor: function() {
                this.name = HelloMessageProxy.NAME;
                this.setData([]);
                this.messages = this.data;
            },


            addMessage: function(message) {
                this.messages.push(message);
                this.sendNotification("messageProxyUpdated", null);
            }
        });

        HelloMessageProxy.NAME = "HelloMessageProxy";

        return HelloMessageProxy;
    }
);
