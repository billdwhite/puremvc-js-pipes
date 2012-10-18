var profile = {
    basePath: "./",
    releaseDir: "./libs/dojobuild",
    optimize: "closure",
    layerOptimize: "closure",
    cssOptimize: "comments",
    selectorEngine: "lite",
    action: "release",
    hasReport: true,
    insertAbsMids: false,
    stripConsole: "all",
    mini: true,
    copyTests: false,
    packages: [
        "dojo", 
        "dijit",
        "dojox",
        "xstyle", 
        "put-selector",
        "dgrid"
    ],
    layers: {
        "dojolayer": {
            include: [
                "dojo/dojo",
                "dijit/dijit",
                "dojox/io/xhrPlugins",
                "dojo/domReady", 
                "dojo/_base/declare",
                "dgrid/List", 
                "dgrid/Grid",
                "dgrid/OnDemandGrid", 
                "dgrid/Selection",
                "dgrid/Keyboard",
                "xstyle/css",
                "dgrid/tree"
            ],
            boot: false,
            customBase: false
        }
    }
};