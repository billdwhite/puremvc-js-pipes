define(
    [
        "dojo/_base/declare",
        "modulesandpipes/common/HelloMessage",
        "modulesandpipes/common/HelloModuleColorFilterMessage",
        "modulesandpipes/common/PipeNames",
        "modulesandpipes/modules/hellomodule/view/components/HelloModuleConstants",
        "modulesandpipes/modules/hellomodule/view/HelloModuleMediator"
    ],
    function(declare, HelloMessage, HelloModuleColorFilterMessage, PipeNames, HelloModuleConstants, HelloModuleMediator) {

        var HelloModuleJunctionMediator = declare(org.puremvc.js.multicore.utilities.pipes.plumbing.JunctionMediator, {
            /**
             * <code>JunctionMediator</code> object used to connect the module through pipes
             * to the shell and other <code>HelloModule</code>.
             */


            /**
             * Constructor.
             * <P>
             * Creates and registers its own STDIN pipe and adds this instance as
             * a listener, because any other instance to which it's connected uses
             * a TeeMerge and new inputs are added to it rather than as separate
             * pipes registered with the Junction.
             * </P>
             * <P>
             * Also adds a filter to accept only null <code>toModuleColor</code>
             * messages or messages with <code>toModuleColor</code> is the same
             * as the color of the module.
             * </P>
             */
            constructor: function(name, viewComponent) {
                this.mediatorName = HelloModuleJunctionMediator.NAME;
                this.setViewComponent(new org.puremvc.js.multicore.utilities.pipes.plumbing.Junction());
            },


            /**
             * Called when Mediator is registered.
             * <P>
             * Registers a short pipeline consisting of a Merging Tee connected to
             * a Filter for STDIN, setting the HelloModuleJunctionMediator as the
             * Pipe Listener.
             * </P>
             * <P>
             * The filter is used to filter messages by color to process only the
             * messages which the module is recipient (based on toModuleColor).
             * </P>
             */
            onRegister: function() {
                //We need the color of the current module to setup the color filter.
                var helloModuleMediator = this.getFacade().retrieveMediator(HelloModuleMediator.NAME);
                var color = helloModuleMediator.getModuleColor();

                /*
                 * Setup for the input pipe tee merge. All input pipes registered
                 * with as PipeConstants.STDIN will be merged on it.
                 */
                var filter = new org.puremvc.js.multicore.utilities.pipes.plumbing.Filter({name:HelloModuleColorFilterMessage.COLOR_FILTER_NAME});
                filter.setFilter(HelloModuleColorFilterMessage.filterMessageByColor);
                filter.setParams({color: color});
                filter.connect(new org.puremvc.js.multicore.utilities.pipes.plumbing.PipeListener({context:this, listener:this.handlePipeMessage}));

                var teeMerge = new org.puremvc.js.multicore.utilities.pipes.plumbing.TeeMerge();
                teeMerge.connect(filter);
                this.getJunction().registerPipe(PipeNames.STDIN, org.puremvc.js.multicore.utilities.pipes.plumbing.Junction.INPUT, teeMerge);

                var teeSplit = new org.puremvc.js.multicore.utilities.pipes.plumbing.TeeSplit();
                this.getJunction().registerPipe(PipeNames.HELLO_OUT_TO_HELLO, org.puremvc.js.multicore.utilities.pipes.plumbing.Junction.OUTPUT, teeSplit);
            },


            /**
             * Handle Junction related Notifications for the HelloModule.
             */
            handleNotification: function(notification) {
                var pipe;
                var type = this.type = notification.getType();

                switch (notification.getName()) {
                    /*
                     * When an ACCEPT_INPUT_PIPE notification is received by the
                     * module it checks that the pipe type need a merge and then
                     * create a tee merge between it and the existing module's
                     * pipe.
                     */
                    case org.puremvc.js.multicore.utilities.pipes.plumbing.JunctionMediator.ACCEPT_INPUT_PIPE:
                        /*
                         * Create a tee merge between accepted pipe and the
                         * existing module's STDIN pipe.
                         */
                        if (type == PipeNames.STDIN) {
                            pipe = notification.getBody();
                            var teeMerge = this.getJunction().retrievePipe(PipeNames.STDIN);
                            teeMerge.connectInput(pipe);

                            // it does not need to be handled by super.
                            return;
                        }

                        break;

                    /**
                     * Add an input pipe (special output handling for each new
                     * connected HelloModule).
                     */
                    case org.puremvc.js.multicore.utilities.pipes.plumbing.JunctionMediator.ACCEPT_OUTPUT_PIPE:
                        /*
                         * Output splitting tee for HELLO_TO_HELLO pipes. We need
                         * to override super to handle this.
                         */
                        if (type == PipeNames.HELLO_OUT_TO_HELLO) {
                            pipe = notification.getBody();
                            var teeSplit = this.getJunction().retrievePipe(PipeNames.HELLO_OUT_TO_HELLO);
                            teeSplit.connect(pipe);

                            //It does not need to be handled by super.
                            return;
                        }

                        break;
                }

                // Use super for any notifications that do not need special consideration.
                this.inherited(arguments);
            },


            /**
             * Handle incoming pipe messages.
             */
            handlePipeMessage: function(/*PipeMessage*/message) {
                /*
                 * Only HelloModuleMessage object and messages not received from
                 * the module itself are added to module's list of messages.
                 */
                if (message instanceof HelloMessage && HelloMessage(message).senderID != this.multitonKey) {
                    this.sendNotification(HelloModuleConstants.STORE_MESSAGE, message);
                }
            },


            /**
             * Send a message on an OUTPUT pipe through the junction owned by this
             * <code>JunctionMediator</code> object. We need it to expose the
             * <code>Junction.sendMessage()</code> method to commands.
             */
            sendMessage: function(/*String*/outputPipeName, /*PipeMessage*/message) {
                return this.getJunction().sendMessage(outputPipeName, message);
            },


            /**
             * Disconnect all the pipes used by the JunctionMediator.
             */
            tearDown: function() {
                var teeSplit = this.getJunction().retrievePipe(PipeNames.HELLO_OUT_TO_HELLO);
                while (teeSplit.disconnect()) {
                    this.getJunction().removePipe(PipeNames.HELLO_OUT_TO_HELLO);
                }

                var teeMerge = this.getJunction().retrievePipe(PipeNames.STDIN);
                while (teeMerge.disconnect()) {
                    this.getJunction().removePipe(PipeNames.STDIN);
                }
            }
        });

        HelloModuleJunctionMediator.NAME = 'HelloModuleJunctionMediator';

        return HelloModuleJunctionMediator;
    }
);