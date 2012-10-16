define(
    [
        "dojo/_base/declare"
    ],
    function(declare) {

        var ModuleMediator = declare(puremvc.Mediator, {

            /**
             * Mediator for each loaded Module.
             * <P>
             * Instantiate and manage each loaded Module for the application.
             */
            module: null,


            /**
             * Constructor
             * @param name
             *         We will use the URI of the module as unique name for the
             *         mediator, it will later facilitate its use.
             * @param viewComponent
             *         An instance of a view
             */
            constructor: function(name, viewComponent) {
                this.mediatorName = name;
                this.module = viewComponent;
            },


            /**
             * Returns the Module ID.
             * <P>
             * Note that here we use it to create the ModuleMediator name.
             */
            getID: function() {
                return this.module.getID();
            },


            /**
             * Ask the module to setup its PureMVC implementation and pipes.
             */
            setup: function() {
                this.module.setup();
            },


            /**
             * Ask the module to tear down its PureMVC implementation and pipes.
             */
            tearDown: function() {
                this.module.teardown();
            }

        });

        ModuleMediator.NAME = "moduleMediator";

        return ModuleMediator;
    }
);