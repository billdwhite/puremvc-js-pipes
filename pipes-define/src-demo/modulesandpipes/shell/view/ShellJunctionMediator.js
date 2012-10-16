define(
    [
        "dojo/_base/declare",
        "modulesandpipes/common/HelloMessage",
        "modulesandpipes/common/PipeNames",
        "modulesandpipes/common/SetupInfoMessage",
        "modulesandpipes/shell/ShellFacade",
        "modulesandpipes/shell/ShellFacadeConstants"
    ],
    function(declare, HelloMessage, PipeNames, SetupInfoMessage, ShellFacade, ShellFacadeConstants) {

        var ShellJunctionMediator = declare(org.puremvc.js.multicore.utilities.pipes.plumbing.JunctionMediator, {

            outMap: null,


            constructor: function(name, viewComponent) {
                this.mediatorName = ShellJunctionMediator.NAME;
                this.setViewComponent(new org.puremvc.js.multicore.utilities.pipes.plumbing.Junction());
                this.outMap = [];
            },


            /**
             * Called when the Mediator is registered.
             * <P>Registers a Merging Tee for STDIN, and sets this as the Pipe Listener.</P>
             * <P>Registers a Pipe for STDLOG and connects it to LoggerModule.</P>
             */
            onRegister: function() {
                this.inherited(arguments);
                // The STDOUT pipe from the shell to all modules
                this.getJunction().registerPipe(PipeNames.STDOUT, org.puremvc.js.multicore.utilities.pipes.plumbing.Junction.OUTPUT, new org.puremvc.js.multicore.utilities.pipes.plumbing.TeeSplit());
                // The STDIN pipe to the shell from all modules
                this.getJunction().registerPipe(PipeNames.STDIN, org.puremvc.js.multicore.utilities.pipes.plumbing.Junction.INPUT, new org.puremvc.js.multicore.utilities.pipes.plumbing.TeeMerge());
                this.getJunction().addPipeListener(PipeNames.STDIN, this, this.handlePipeMessage);
            },


            /**
             * ShellJunction related Notification list.
             * <P>Adds subclass interests to JunctionMediator interests.</P>
             */
            listNotificationInterests: function() {
                var interests = this.inherited(arguments);
                interests.push(ShellFacadeConstants.CONNECT_MODULE_TO_SHELL);
                interests.push(ShellFacadeConstants.DISCONNECT_MODULE_FROM_SHELL);
                interests.push(ShellFacadeConstants.SEND_MESSAGE_TO_ALL_HELLO_MODULES);
                return interests;
            },

            /**
             * Handle ShellJunction related Notifications.
             */
            handleNotification: function(notification) {
                var moduleID;
                var moduleFacade;
                var shellOut;

                switch (notification.getName()) {

                    case ShellFacadeConstants.SEND_MESSAGE_TO_ALL_HELLO_MODULES:
                        /*
                         * The shell is not an HelloModule. We could not provide any
                         * valid fromModuleColor argument. We let it null.
                         * As the message is sent to all module we also do not provide
                         * any toModuleColor argument.
                         */
                        var helloModuleMessage = new HelloMessage({fromModuleColor:null, toModuleColor:null, senderID:"shell", message:"hello all!"});

                        this.getJunction().sendMessage(PipeNames.STDOUT, helloModuleMessage);

                        break;

                    case ShellFacadeConstants.CONNECT_MODULE_TO_SHELL:
                        // Connect a module's ANY_MODULE_TO_SHELL to the shell's STDIN
                        moduleID = notification.getBody();
                        moduleFacade = puremvc.Facade.getInstance(moduleID);

                        // Create the pipe
                        var moduleToShell = new org.puremvc.js.multicore.utilities.pipes.plumbing.Pipe();
                        moduleFacade.acceptOutputPipe(PipeNames.ANY_MODULE_TO_SHELL, moduleToShell);

                        // Connect the pipe to the Shell STDIN TeeMerge
                        var shellIn = this.getJunction().retrievePipe(PipeNames.STDIN);
                        shellIn.connectInput(moduleToShell);

                        // Create the pipe
                        var shellToModule = new org.puremvc.js.multicore.utilities.pipes.plumbing.Pipe();

                        // Connect the pipe to our module facade.
                        moduleFacade.acceptInputPipe(PipeNames.STDIN, shellToModule);

                        // Connect Shell STDOUT TeeSplit to the pipe.
                        shellOut = this.getJunction().retrievePipe(PipeNames.STDOUT);
                        shellOut.connect(shellToModule);

                        this.outMap[moduleID] = shellToModule;

                        break;

                    case ShellFacadeConstants.DISCONNECT_MODULE_FROM_SHELL:
                        moduleID = notification.getBody();
                        moduleFacade = puremvc.Facade.getInstance(moduleID);

                        /*
                         * We only need to disconnect the <code>shellToModule</code>
                         * pipe as the only reference to this pipe is owned by the
                         * module we remove, it will be garbaged with it.
                         */
                        shellOut = this.getJunction().retrievePipe(PipeNames.STDOUT);
                        shellOut.disconnectFitting(this.outMap[moduleID]);
                        this.outMap.splice(this.outMap.indexOf[moduleID], 1);

                        break;

                    // And let super handle the rest (ACCEPT_OUTPUT_PIPE, ACCEPT_INPUT_PIPE, SEND_TO_LOG)
                    default:
                        this.inherited(arguments);
                }
            },

            /**
             * Handle incoming pipe messages for the ShellJunction.
             * <P>Note that we are handling PipeMessages with the same idiom
             * as Notifications. Conceptually they are the same, and the
             * Mediator role doesn't change much. It takes these messages
             * and turns them into notifications to be handled by other
             * actors in the main app / shell.</P>
             * <P>Also, it is logging its actions by sending INFO messages
             * to the STDLOG output pipe.</P>
             */
            handlePipeMessage: function(/*PipeMessage*/message) {
                if (message instanceof HelloMessage) {
                    this.sendNotification(ShellFacadeConstants.ADD_HELLO_MESSAGE, message);
                }
                else {
                    if (message instanceof SetupInfoMessage) {
                        /*
                         * We abusively consider here that any SetupInfoMessage received
                         * came from an HelloModule and that it only asks to remove the
                         * module. If you have more than one module type in your
                         * implementation, be smart enough not to do that.
                         */
                        this.sendNotification(ShellFacadeConstants.REMOVE_HELLO_MODULE, SetupInfoMessage(message).key);
                    }
                }
            }
        });

        ShellJunctionMediator.NAME = 'ShellJunctionMediator';

        return ShellJunctionMediator;
    }
);