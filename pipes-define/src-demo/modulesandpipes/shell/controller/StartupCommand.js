define(
    [
        "dojo/_base/declare",
        "modulesandpipes/shell/view/HelloModuleJunctionMediator",
        "modulesandpipes/shell/view/ShellJunctionMediator",
        "modulesandpipes/shell/view/ShellMediator"
    ],
    function(declare, HelloModuleJunctionMediator, ShellJunctionMediator, ShellMediator) {

        var StartupCommand = declare(puremvc.SimpleCommand, {

            /**
             * Startup the Main Application/Shell.
             * <P>
             * Create and register ShellMediator which will own and manage the app and its visual components.
             * </P>
             * <P>
             * Create and register ShellJunctionMediator which will own and manage the Junction for the Main App/Shell.
             * </P>
             * <P>
             * Create and register the HelloModuleJunctionMediator which will own anunique pipe Junction responsible for connecting
             * HelloModule among themselves.
             * </P>
             */
            execute: function(notification) {
                // Create and Register the Shell Junction and its Mediator.
                this.getFacade().registerMediator(new ShellJunctionMediator());

                // Create the Junction mediator used for module to module communication.
                this.getFacade().registerMediator(new HelloModuleJunctionMediator(HelloModuleJunctionMediator.NAME));

                // Create and Register the Application and its Mediator.
                var app = notification.getBody();
                var shellMediator = new ShellMediator(ShellMediator.NAME, app);
                this.getFacade().registerMediator(shellMediator);
            }
        });

        return StartupCommand;
    }
);