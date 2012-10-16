define(
    [
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/on",
        "modulesandpipes/common/ColorNames",
        "modulesandpipes/modules/hellomodule/HelloModuleFacade",
        "modulesandpipes/modules/hellomodule/model/HelloMessageProxy",
        "modulesandpipes/modules/hellomodule/view/components/HelloModuleConstants"
    ],
    function(declare, lang, on, ColorNames, HelloModuleFacade, HelloMessageProxy, HelloModuleConstants) {

        var HelloModuleMediator = declare(puremvc.Mediator, {

            /**
             * The viewComponent cast to type HelloModule.
             */
            helloModule: null,
            messageProxy: null,


            constructor: function(name, viewComponent) {
                this.helloModule = viewComponent;
            },


            /**
             * Register event listeners with the FeedWindow and its controls.
             */
            onRegister: function() {
                this.helloModule.moduleName = this.multitonKey;

                on(this.viewComponent.domNode, HelloModuleConstants.HELLO_SHELL, lang.hitch(this, this.shellButtonClickHandler));
                on(this.viewComponent.domNode, HelloModuleConstants.HELLO_ALL, lang.hitch(this, this.allModuleButtonClickHandler));
                on(this.viewComponent.domNode, HelloModuleConstants.HELLO_RED, lang.hitch(this, this.redModuleButtonClickHandler));
                on(this.viewComponent.domNode, HelloModuleConstants.HELLO_GREEN, lang.hitch(this, this.greenModuleButtonClickHandler));
                on(this.viewComponent.domNode, HelloModuleConstants.HELLO_BLUE, lang.hitch(this, this.blueModuleButtonClickHandler));
                on(this.viewComponent.domNode, HelloModuleConstants.REMOVE_MODULE, lang.hitch(this, this.removeModuleHandler));
                on(this.viewComponent.domNode, HelloModuleConstants.TEARDOWN, lang.hitch(this, this.tearDownHandler));

                //Bind the messageProxy list of messages with the view list of messages.
                this.messageProxy = this.getFacade().retrieveProxy(HelloMessageProxy.NAME);
                this.helloModule.messages = this.messageProxy.messages;
            },


            /**
             * Application related Notification list.
             */
            listNotificationInterests: function() {
                return [
                    "messageProxyUpdated"
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
                    case "messageProxyUpdated":
                        this.helloModule.messages = this.messageProxy.messages;
                        this.helloModule.refreshMessages();
                        break;
                }
            },


            getModuleColor: function() {
                return this.helloModule.moduleColor;
            },


            /**
             * @private
             */
            removeModuleHandler: function(event) {
                this.sendNotification(HelloModuleConstants.SEND_REMOVE_SIGNAL_TO_SHELL);
            },


            shellButtonClickHandler: function(event) {
                this.sendNotification(HelloModuleConstants.SEND_MESSAGE_TO_SHELL, "Hello");
            },


            allModuleButtonClickHandler: function(event) {
                // suppress this event so other components will not act upon it;
                // @todo: doesn't work for some reason so renaming helloAll event to be more specific for now,
                // otherwise, shell answers this as well
                event.preventDefault();

                this.sendNotification(HelloModuleConstants.SEND_MESSAGE_TO_HELLO_MODULE, "Hello");
            },


            redModuleButtonClickHandler: function(event) {
                this.sendNotification(HelloModuleConstants.SEND_MESSAGE_TO_HELLO_MODULE, "Hello", ColorNames.RED);
            },


            greenModuleButtonClickHandler: function(event) {
                this.sendNotification(HelloModuleConstants.SEND_MESSAGE_TO_HELLO_MODULE, "Hello", ColorNames.GREEN);
            },


            blueModuleButtonClickHandler: function(event) {
                this.sendNotification(HelloModuleConstants.SEND_MESSAGE_TO_HELLO_MODULE, "Hello", ColorNames.BLUE);
            },


            tearDownHandler: function(event) {
                this.sendNotification(HelloModuleConstants.TEARDOWN);
            }
        });

        HelloModuleMediator.NAME = 'HelloModuleMediator';

        return HelloModuleMediator;
    }
);