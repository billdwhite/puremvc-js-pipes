define(
    [
        "dojo/_base/declare",
        "dojo/dom-construct",
        "dojo/on",
        "dojo/cache",
        "dojo/text",
        "dijit/_Widget",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dgrid/OnDemandList",
        "dgrid/OnDemandGrid",
        "dgrid/Selection",
        "dojo/store/Memory",
        "dojo/store/Observable",
        "dojo/text!./templates/ShellTemplate.html",
        "dijit/layout/ContentPane",
        "dijit/form/Button"
    ],
    function(declare, domConstruct, on, cache, text, Widget, TemplatedMixin, WidgetsInTemplateMixin, List, Grid, Selection,
             Memory, Observable, template) {

        var Shell = declare([Widget, TemplatedMixin, WidgetsInTemplateMixin], {

            templateString: template,
            grid: null,
            gridStore: null,


            startup: function() {
                this.inherited(arguments);
                this.gridStore = new Observable(new Memory({data:[]}));
                this.grid = new (declare([Grid,Selection]))({
                    store:this.gridStore,
                    columns: [
                        {label: 'Type', field: 'type'},
                        {label: 'Body', field: 'body'},
                        {label: 'Message', field: 'message'}
                    ]
                }, this.gridContainer);
                this.grid.refresh();
            },


            addModule: function(/*Widget*/module) {
                module.placeAt(this.containerNode.domNode);
            },


            removeModule: function(/*Widget*/module) {
                module.destroy();
            },


            addHelloHandler: function() {
                this.sendEvent(Shell.ADD_HELLO_MODULE);
            },


            helloAllHandler: function() {
                this.sendEvent(Shell.HELLO_ALL);
            },


            sendEvent: function(/*String*/name) {
                switch (name) {
                    case Shell.ADD_HELLO_MODULE:
                        on.emit(this.domNode, Shell.ADD_HELLO_MODULE, {bubbles:true, cancelable:true, shell:this});
                        break;

                    case Shell.HELLO_ALL:
                        on.emit(this.domNode, Shell.HELLO_ALL, {bubbles:true, cancelable:true, shell:this});
                        break;
                }
            }
        });

        Shell.NAME = 'shell';
        Shell.ADD_HELLO_MODULE = 'addHelloModule';
        Shell.HELLO_ALL = 'helloAllFromShell';

        return Shell;
    }
);