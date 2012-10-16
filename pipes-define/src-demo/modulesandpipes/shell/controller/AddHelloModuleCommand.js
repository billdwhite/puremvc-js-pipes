define(
    [
        "dojo/_base/declare",
        "dojo/_base/lang",
        "modulesandpipes/shell/ShellFacadeConstants",
        "modulesandpipes/shell/view/ModuleMediator",
        "modulesandpipes/shell/view/ShellMediator"
    ],
    function(declare, lang, ShellFacade, ModuleMediator, ShellMediator) {

        var AddHelloModuleCommand = declare(puremvc.SimpleCommand, {

            /**
             * The new module is instantiated, and connected via pipes to the
             * logger and the shell. Finally a Mediator is registered for it.
             */
            execute: function(notification) {

                var helloModule;
                require([notification.getBody()], lang.hitch(this, function(module) {
                    helloModule = new module();
                    helloModule.startup();
                    // we register a mediator for each newly created module.
                    var moduleMediator = new ModuleMediator(helloModule.moduleID, helloModule)
                    this.getFacade().registerMediator(moduleMediator);

                    /*
                     * This will setup the module PureMVC implementation.
                     * Be careful at this time, the Flex module application has not yet
                     * fired its CreationComplete event. Only its PureMVC setup and
                     * pipes are ready to use.
                     */
                    moduleMediator.setup();

                    // the module is added to the display list
                    var shellMediator = this.getFacade().retrieveMediator(ShellMediator.NAME);
                    shellMediator.addHelloModule(helloModule);

                    this.sendNotification(ShellFacade.CONNECT_MODULE_TO_SHELL, moduleMediator.getID());

                    /*
                     * Each <code>ModuleMediator</code> object handle this
                     * notification. So each loaded HelloModule will be connected
                     * through pipe to this new module.
                     */
                    this.sendNotification(ShellFacade.CONNECT_HELLO_MODULE_TO_HELLO_MODULE, moduleMediator.getID());
                }));
            }
        });

        return AddHelloModuleCommand;
    }
);