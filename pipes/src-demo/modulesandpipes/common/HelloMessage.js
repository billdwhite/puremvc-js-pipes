define(
    [
        "dojo/_base/declare"
    ],
    function(declare) {

        var HelloMessage = declare(puremvc.pipes.Message, {
            /**
             * Pipe message used to transport "hello" messages.
             */
            fromModuleColor: null,
            toModuleColor: null,
            senderID: null,
            message: null,


            /**
             * Constructor.
             *
             * @param fromModuleColor
             *         The module color from which the message is sent.
             * @param toModuleColor
             *         The color of the modules we want to accept the message.
             * @param senderID
             *         Sender module unique identifier for this message.
             * @param message
             *         Message body of the message.
             */
            constructor: function(args) {
                if (args) {
                    this.header = {
                        senderID: args.senderID,
                        fromModuleColor: args.fromModuleColor,
                        toModuleColor: args.toModuleColor
                    };
                    this.fromModuleColor = args.fromModuleColor;
                    this.toModuleColor = args.toModuleColor;
                    this.senderID = args.senderID;
                    this.message = args.message;
                    this.body = args.message;
                }

                this.type = puremvc.pipes.Message.NORMAL;
            }

        });

        return HelloMessage;
    }
);