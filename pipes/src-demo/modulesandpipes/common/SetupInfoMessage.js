define(
    [
        "dojo/_base/declare"
    ],
    function(declare) {

        var SetupInfoMessage = declare(puremvc.pipes.Message, {

            /**
             * Pipe message object used to transport module setup info messages.
             * <P>
             * Can be used by any module type loaded by a Flex application not
             * specifically an HelloModule.
             * </P>
             */
            signal: null,


            /**
             * Constructor.
             * @param key
             *         Sender module unique identifier for this message.
             * @param signal
             *         SetupInfo signal type for this message.
             */
            constructor: function(args) {
                if (args) {
                    this.priority = puremvc.pipes.Message.NORMAL;
                    this.key = args.key;
                    this.signal = args.signal;
                }
            }
        });

        /**
         * The remove signal type used to indicate this message asks the shell
         * to remove the sender module from the display list.
         */
        SetupInfoMessage.REMOVE = "remove";

        return SetupInfoMessage;
    }
);