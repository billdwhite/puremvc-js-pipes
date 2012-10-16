define(
    [
        "dojo/_base/declare",
        "modulesandpipes/common/PipeNames",
        "modulesandpipes/shell/ShellFacade",
        "modulesandpipes/shell/ShellFacadeConstants"
    ],
    function(declare, PipeNames, ShellFacade, ShellFacadeConstants) {

        var HelloModuleJunctionMediator = declare(puremvc.pipes.JunctionMediator, {

            /**
             * An HelloModuleJunctionMediator instance will own an unique pipe Junction
             * responsible for connecting HelloModule among themselves.
             * <P>
             * Reason for that is if we want to let <code>HelloModule</code>s
             * communicate among themselves the only other solution is to register
             * each newly created HelloModule input and output pipes with all existing
             * <code>HelloModule</code>s. It simplify the process and preserve some
             * memory. Consider it as something not standard regarding PureMVC pipes.
             * </P>
             */
            outMap: null,


            constructor: function(name, viewComponent) {
                this.mediatorName = HelloModuleJunctionMediator.NAME;
                this.setViewComponent(new puremvc.pipes.Junction());
                this.outMap = [];
            },


            /**
             * Called when the Mediator is registered.
             *
             * <P>
             * Registers a Merging Tee for HELLO_OUT_TO_HELLO,
             * and sets this as the Pipe Listener.
             * </P>
             */
            onRegister: function() {
                // The STDIN pipe from the shell to all modules
                this.getJunction().registerPipe(PipeNames.STDIN, puremvc.pipes.Junction.OUTPUT, new puremvc.pipes.TeeSplit());
                // The HELLO_OUT_TO_HELLO pipe to the shell from all modules
                this.getJunction().registerPipe(PipeNames.HELLO_OUT_TO_HELLO, puremvc.pipes.Junction.INPUT, new puremvc.pipes.TeeMerge());
                this.getJunction().addPipeListener(PipeNames.HELLO_OUT_TO_HELLO, this, this.handlePipeMessage);
            },


            /**
             * ShellJunction related Notification list.
             * <P>Adds subclass interests to JunctionMediator interests.</P>
             */
            listNotificationInterests: function() {
                return [
                    ShellFacadeConstants.CONNECT_HELLO_MODULE_TO_HELLO_MODULE,
                    ShellFacadeConstants.DISCONNECT_HELLO_MODULE_FROM_HELLO_MODULE
                ];
            },


            /**
             * Handle HelloModuleJunction related Notifications.
             */
            handleNotification: function(notification) {
                var moduleID = notification.getBody();
                var moduleFacade = puremvc.Facade.getInstance(moduleID);
                var junctionOut;

                switch (notification.getName()) {
                    case ShellFacadeConstants.CONNECT_HELLO_MODULE_TO_HELLO_MODULE:

                        // Create the pipe
                        var moduleToShellJunction = new puremvc.pipes.Pipe();
                        moduleFacade.acceptOutputPipe(PipeNames.HELLO_OUT_TO_HELLO, moduleToShellJunction);

                        // Connect the pipe to the Shell HELLO_IN_TO_HELLO_OUT TeeMerge
                        var junctionIn = this.getJunction().retrievePipe(PipeNames.HELLO_OUT_TO_HELLO);
                        junctionIn.connectInput(moduleToShellJunction);

                        // Create the pipe
                        var shellToModuleJunction = new puremvc.pipes.Pipe();

                        // Connect the pipe to our module facade.
                        moduleFacade.acceptInputPipe(PipeNames.STDIN, shellToModuleJunction);

                        // Connect Shell HELLO_OUT_TO_HELLO_IN TeeSplit to the pipe.
                        junctionOut = this.getJunction().retrievePipe(PipeNames.STDIN);
                        junctionOut.connect(shellToModuleJunction);

                        //Add the newly created junction to the map.
                        this.outMap[moduleID] = shellToModuleJunction;

                        break;

                    case ShellFacadeConstants.DISCONNECT_HELLO_MODULE_FROM_HELLO_MODULE:

                        /*
                         * We only need to disconnect the <code>shellToModule</code>
                         * pipe as the only reference to this pipe is owned by the
                         * module we remove, it will be garbaged with it.
                         */
                        junctionOut = this.getJunction().retrievePipe(PipeNames.STDIN);
                        junctionOut.disconnectFitting(this.outMap[moduleID]);

                        this.outMap.splice(this.outMap.indexOf[moduleID], 1);

                        break;

                    default:
                        break;
                }
            },


            /**
             * The only important thing this Junction does is to redirect any
             * message from an HelloModule out to all HelloModule in pipes.
             */
            handlePipeMessage: function(/*PipeMessage*/message) {
                // Sends the message on the output pipeline
                var junctionOut = this.getJunction().retrievePipe(PipeNames.STDIN);
                junctionOut.write(message);
            }

        });

        HelloModuleJunctionMediator.NAME = 'HelloModuleJunctionMediator';

        return HelloModuleJunctionMediator;
    }
);