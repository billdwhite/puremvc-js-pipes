define(
    [
        "dojo/_base/declare",
        "modulesandpipes/modules/hellomodule/model/HelloMessageProxy",
        "modulesandpipes/modules/hellomodule/view/HelloModuleJunctionMediator",
        "modulesandpipes/modules/hellomodule/view/HelloModuleMediator"
    ],
    function(declare, HelloMessageProxy, HelloModuleJunctionMediator, HelloModuleMediator) {

        var StartupCommand = declare(puremvc.SimpleCommand, {

            /**
             * Startup the HelloModule.
             * <P>
             * Create and register new MessageProxy to manage the message list.
             * </P>
             * <P>
             * Create and register new HelloModuleJunctionMediator which will mediate
             * communications over the pipes of its junction HelloModuleMediator to
             * manage the the feed.
             * </P>
             */
            execute: function(notification) {
                this.getFacade().registerProxy(new HelloMessageProxy());
                // Create and register the HelloModule and its Mediator for this module instance.
                var helloModule = notification.getBody();
                var helloModuleMediator = new HelloModuleMediator(HelloModuleMediator.NAME, helloModule);
                this.getFacade().registerMediator(helloModuleMediator);

                // Create and register the HelloModule Junction Mediator
                var helloModuleJunctionMediator = new HelloModuleJunctionMediator(HelloModuleJunctionMediator.NAME);
                this.getFacade().registerMediator(helloModuleJunctionMediator);
            }
        });

        return StartupCommand;
    }
);