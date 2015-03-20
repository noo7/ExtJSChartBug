/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('MyApp.view.main.Main', {
    /**
     * @requires Ext.chart.cartesian
     */
    requires: [
        'MyApp.view.main.MainController',
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Time',
        'Ext.chart.plugin.ItemEvents',
        'Ext.chart.axis.Category',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.interactions.CrossZoom',
        'Ext.chart.interactions.ItemInfo',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.series.Line'
    ],
    extend: 'Ext.container.Container',

    xtype: 'main',

    controller: 'main',
    layout: {
        type: 'border'
    },

    items: [{
        xtype: 'panel',
        region: 'west',
        width: 250,
        split: true,
        reference:'buttonsContainer',
        tbar: [{
            text: 'start',
            handler: 'onClickButton'
        },
        {
            text: 'update',
            handler:'updateRunlineChart'
        }]
        },
        {
        xtype:'panel',
        layout:'fit',
        region:'center',
        items:[{
            xtype: 'cartesian',
            legend: {
                docked: 'top'
            },
            reference:'runlinechart',
            interactions: [{
                type: 'panzoom',
                axes:{
                    left: {
                    maxZoom: 10,
                    allowPan: true
                    },
                
                    right: {
                    maxZoom: 10,
                    allowPan: true
                    },
                    bottom: false
                },
                zoomOnPanGesture: true
             }],
            axes: [{
                type: 'time',
                id:'main-time-axis',
                position: 'left',
                grid:true,
                fields: ['time'],
                dateFormat:'d/M H:i'
            },
            {
                linkedTo:'main-time-axis',
                position:'right'
            },
            {
                type: 'numeric',
                position: 'bottom',
                fields: 'position',
                minimum:0,
                maximum:100,
                hidden:true
            }],
            series: []
        
        }]
    }]
});