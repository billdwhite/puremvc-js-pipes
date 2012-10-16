define(
    [
        "dojo/_base/declare",
        "modulesandpipes/common/PipeNames",
        "modulesandpipes/modules/hellomodule/view/HelloModuleJunctionMediator",
        "modulesandpipes/common/SetupInfoMessage"
    ],
    function(declare, PipeNames, HelloModuleJunctionMediator, SetupInfoMessage) {

        var SendRemoveSignalToShellCommand = declare(puremvc.SimpleCommand, {

            /**
             * Send a <code>SetupInfoMessage</code> to the shell.
             * <P>
             * We only really use it here to ask the shell to remove an HelloModule.
             * Before removing the module, the shell will call the teardown method of
             * this HelloModule instance. We must be ready for the teardown.
             * </P>
             */
            execute: function(notification) {
                var helloModuleJunctionMediator = this.getFacade().retrieveMediator(HelloModuleJunctionMediator.NAME);
                var key = this.multitonKey;
                var setupInfoMessage = new SetupInfoMessage({key:key, signal:SetupInfoMessage.REMOVE});
                helloModuleJunctionMediator.sendMessage(PipeNames.ANY_MODULE_TO_SHELL, setupInfoMessage);
            }
        });

        return SendRemoveSignalToShellCommand;
    }
);