define(
    [
        "dojo/_base/declare"
    ],
    function(declare) {

        var HelloModuleColorFilterMessage = declare(org.puremvc.js.multicore.utilities.pipes.messages.FilterControlMessage, {
            /**
             * Filter used by modules to accept or refuse messages depending on the
             * color of the HelloModule which the message is directed.
             * <P>
             * When received by an HelloModule it will only accept the appropriate
             * messages (RED to red modules only, GREEN to green modules only, BLUE to
             * blue modules only and null to all modules).
             * </P>
             */
            _color: null,


            constructor: function(args) {
                if (args) {
                    this.type = args.type;
                    this._color = args.color;
                    this.params = {color:args.color};
                }
                this.name = HelloModuleColorFilterMessage.COLOR_FILTER_NAME;
                this.filter = null;
            }
        });

        HelloModuleColorFilterMessage.BASE = org.puremvc.js.multicore.utilities.pipes.messages.FilterControlMessage.BASE + '/HelloModule/';
        HelloModuleColorFilterMessage.COLOR_FILTER_NAME = HelloModuleColorFilterMessage.BASE + '/HelloModule/colorFilter/';

        /**
         * Filter method applied when a message is received on the HelloModule's
         * STDIN pipe. If the toModuleColor is null the message is not filtered,
         * all the module will receive it. If not null and not equals to the
         * color of the recipient module, it will be rejected.
         */
        HelloModuleColorFilterMessage.filterMessageByColor = function(/*PipeMessage*/message, /*Object*/params) {
            if ((message.header.toModuleColor != undefined) && (message.header.toModuleColor != params.color)) {
                throw new Error();
            }
        };

        return HelloModuleColorFilterMessage;
    }
);