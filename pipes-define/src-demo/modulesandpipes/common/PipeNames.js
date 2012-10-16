define(
    [
        "dojo/_base/declare"
    ],
    function(declare) {

        var PipeNames = declare(null, {});

        /**
         * Standard output pipe name constant.
         */
        PipeNames.STDOUT = "standardOutput";

        /**
         * Standard input pipe name constant.
         */
        PipeNames.STDIN = "standardInput";

        /**
         * Standard Shell input pipe name constant.
         */
        PipeNames.ANY_MODULE_TO_SHELL = "anyModuleToShell";

        /**
         * HelloModule to HelloModule output pipe name constant.
         */
        PipeNames.HELLO_OUT_TO_HELLO = "helloToHelloOut";

        return PipeNames;
    }
);