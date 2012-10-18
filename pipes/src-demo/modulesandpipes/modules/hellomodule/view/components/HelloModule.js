define(
    [
        "dojo/_base/declare",
        "dojo/cache",
        "dojo/text",
        "dojo/dom-style",
        "dojo/dom-construct",
        "dojo/on",
        "dijit/_Widget",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "modulesandpipes/modules/hellomodule/HelloModuleFacade",
        "modulesandpipes/modules/hellomodule/view/components/HelloModuleConstants",
        "modulesandpipes/common/ColorNames",
        "dgrid/OnDemandList",
        "dgrid/OnDemandGrid",
        "dgrid/Selection",
        "dojo/store/Memory",
        "dojo/store/Observable",
        "dojo/text!./templates/HelloModuleTemplate.html"
    ],
    function(declare, cache, text, domStyle, domConstruct, on, Widget, TemplatedMixin, WidgetsInTemplateMixin,
             HelloModuleFacade, HelloModuleConstants, ColorNames, List, Grid, Selection, Memory, Observable, template) {

        var HelloModule = declare([Widget, TemplatedMixin, WidgetsInTemplateMixin], {

            templateString: template,
            facade: null,
            moduleID: null,
            moduleColor: null,
            moduleName: null,
            messages: null,
            grid: null,
            gridStore: null,


            constructor: function() {
                this.moduleID = HelloModule.getNextID();
                this.moduleColor = HelloModule.generateRandomColor();
                this.messages = [];
            },


            startup: function() {
                this.inherited(arguments);
                domStyle.set(this.domNode, "backgroundColor", this.moduleColor);
                this.gridStore = new Observable(new Memory({data:this.messages}));
                this.grid = new (declare([Grid,Selection]))({
                    store:this.gridStore,
                    columns:[{label:'type',field:'type'},{label:'body',field:'body'},{label:'message',field:'message'}]
                }, this.gridContainer);
                this.grid.refresh();
            },


            setup: function() {
                this.facade = HelloModuleFacade.getInstance(this.moduleID);
                this.facade.startup(this);
            },


            /**
             * @inheritDoc
             */
            teardown: function() {
                this.sendEvent(HelloModule.TEARDOWN);
            },


            /**
             * @inheritDoc.
             */
            getID: function() {
                return this.moduleID;
            },


            /**
             * Helper method needed to dispatch HelloModule events to its
             * listeners.
             */
            sendEvent: function(/*String*/name) {
                on.emit(this.domNode, name, {bubbles:false, cancelable:true, shell:this});
            },


            helloShell: function() {
                this.sendEvent(HelloModuleConstants.HELLO_SHELL);
            },


            helloAll: function() {
                this.sendEvent(HelloModuleConstants.HELLO_ALL);
            },


            helloRed: function() {
                this.sendEvent(HelloModuleConstants.HELLO_RED);
            },


            helloGreen: function() {
                this.sendEvent(HelloModuleConstants.HELLO_GREEN);
            },


            helloBlue: function() {
                this.sendEvent(HelloModuleConstants.HELLO_BLUE);
            },


            closeModule: function() {
                this.sendEvent(HelloModuleConstants.REMOVE_MODULE);
            },


            refreshMessages: function() {
                this.grid.store.data = this.messages;
                this.grid.refresh();
            },


            addMessage: function(message) {
                this.messages.push(message);
                this.grid.store.data.push(message);
                this.grid.refresh();
            }
        });

        /**
         * Get the next unique id.
         * <P>
         * This module can be instantiated multiple times, so each instance
         * needs to have it's own unique id for use as a multiton key.
         * <P>
         */
        HelloModule.getNextID = function() {
            return HelloModule.NAME + '/' + HelloModule.serial++;
        };

        /**
         * Get the module random generated color. Color is used to determine
         * its UI background color and its type when filtering incoming
         * messages.
         */
        HelloModule.generateRandomColor = function() {
            return [ColorNames.RED, ColorNames.GREEN, ColorNames.BLUE][Math.round(Math.random() * 2)].toString();
        };

        HelloModule.serial = 0;
        HelloModule.NAME = "HelloModule";
        HelloModule.REMOVE_MODULE = "removeModule";
        HelloModule.TEARDOWN = "teardown";
        HelloModule.HELLO_SHELL = "helloShell";
        HelloModule.HELLO_ALL = "helloAllFromModule";
        HelloModule.HELLO_RED = "helloRed";
        HelloModule.HELLO_GREEN = "helloGreen";
        HelloModule.HELLO_BLUE = "helloBlue";

        return HelloModule;
    }
);