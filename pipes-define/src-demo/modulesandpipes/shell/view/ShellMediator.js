define(
    [
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/on",
        "modulesandpipes/shell/ShellFacade",
        "modulesandpipes/shell/ShellFacadeConstants"
    ],
    function(declare, lang, on, ShellFacade, ShellFacadeConstants) {

        var ShellMediator = declare(puremvc.Mediator, {

            helloModuleLoaded: null,
            addHelloModuleCalls: null,
            shell: null,
            moduleList: null,


            constructor: function(/*String*/name, /*Shell*/viewComponent) {
                this.mediatorName = name;
                this.shell = viewComponent;
                this.moduleList = [];
            },


            /**
             * Register event listeners with the app and its fixed controls.
             */
            onRegister: function() {
                on(this.viewComponent.domNode, ShellFacadeConstants.ADD_HELLO_MODULE, lang.hitch(this, this.addHelloModuleHandler));
                on(this.viewComponent.domNode, ShellFacadeConstants.HELLO_ALL, lang.hitch(this, this.helloAllHandler));
            },


            /**
             * Application related Notification list.
             */
            listNotificationInterests: function() {
                return [
                    ShellFacadeConstants.ADD_HELLO_MESSAGE
                ];
            },


            /**
             * Handle MainApp / Shell related notifications.
             * <P>
             * Handle the notification used to display each newly received message
             * from an <code>HelloModule</code>s.
             * </P>
             */
            handleNotification: function(notification) {
                switch (notification.getName()) {
                    case ShellFacadeConstants.ADD_HELLO_MESSAGE:
                        var helloModuleMessage = notification.getBody();
                        this.shell.grid.store.data.push({type: helloModuleMessage.type, sender: helloModuleMessage.senderID, message: helloModuleMessage.message});
                        this.shell.grid.refresh();
                        break;
                }
            },


            /**
             * Add a new instance of an HelloModule to the view for display.
             * @param helloModule
             *         The instance of the HelloModule to add.
             */
            addHelloModule: function(helloModule) {
                this.shell.addModule(helloModule);
                this.moduleList.push(helloModule);
            },


            /**
             * Remove an instance of an HelloModule from the display.
             *
             * @param helloModuleID
             *         The ID instance of the HelloModule to remove.
             */
            removeHelloModule: function(/*String*/helloModuleID) {
                var helloModule = this.getHelloModuleFromID(helloModuleID);
                this.shell.removeModule(helloModule);
            },


            /**
             * Indicate when the module list is empty.
             */
            moduleListEmpty: function() {
                return this.moduleList == 0;
            },


            /**
             * Retrieve a module instance from its module ID.
             */
            getHelloModuleFromID: function(/*String*/helloModuleID) {
                for (var i = 0; i < this.moduleList.length; i++) {
                    if (this.moduleList[i].getID() == helloModuleID) {
                        return this.moduleList[i];
                    }
                }
                return null;
            },


            /**
             * The shell requests a new instance of the HelloModule to be added.
             * <P>
             * If the module need to be loaded first a <code>MODULE_LOADED</code>
             * notification will be dispatched at the end of the loading process.
             * </P>
             */
            addHelloModuleHandler: function(/*Event*/event) {
                this.sendNotification(ShellFacadeConstants.ADD_HELLO_MODULE, ShellFacadeConstants.HELLO_MODULE_URI);
            },


            /**
             * Handle clicks on the "Hello All" button.
             */
            helloAllHandler: function(/*Event*/event) {
                this.sendNotification(ShellFacadeConstants.SEND_MESSAGE_TO_ALL_HELLO_MODULES);
            }
        });

        ShellMediator.NAME = 'ShellMediator';

        return ShellMediator;
    }
);