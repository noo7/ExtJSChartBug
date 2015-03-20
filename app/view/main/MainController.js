/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('MyApp.view.main.MainController', {
    /**
     * @requires Ext.chart.series.Line
     */
    requires: [
        'Ext.chart.series.Line'
    ],
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    trains:['FIRST','SECOND'],
    nowLineStore: Ext.create('MyApp.store.Messages'),
    subscribedTrains:{},
    onClickButton: function(){
        var panzoom = this.lookupReference('runlinechart').getInteractions()[0];
        this.getView().lookupReference('buttonsContainer').add(panzoom.getModeToggleButton());
        console.log('INSIDE ON CLICK');
        this.initRunLineChart();
        //var intervalID = setInterval(this.updateRunlineChart(this),2000);
    },
    //init runlinechart with two series
    initRunLineChart: function(){

        var currDate = new Date();
        var currTime = currDate.getTime();
        var runlinechart = this.lookupReference('runlinechart');
        var trainStores = this.subscribedTrains;
        var runlinesSeries = runlinechart.getSeries();

        var store0 = Ext.create('MyApp.store.Messages');
        var dataPoint0 = {time:1426688600000,position:12,trainLabel:'FIRST'};
        store0.add(dataPoint0);
        var dataPoint1 = {time:1426688688888,position:20,trainLabel:'FIRST'};
        store0.add(dataPoint1);
        
        var store1 = Ext.create('MyApp.store.Messages');
        var dataPoint2 = {time:1426688633333,position:22,trainLabel:'Second'};
        store1.add(dataPoint2);
        var dataPoint3 = {time:1426688677777,position:60,trainLabel:'Second'};
        store1.add(dataPoint3);
        
        this.subscribedTrains[this.trains[0]] = store0;
        this.subscribedTrains[this.trains[1]] = store1;
        
        
        //add series to chart

        this.updateNowLine(currTime);

        var nowLineSeries = {// Now Line Serie
            type: 'line',
            xField: 'position',
            yField: 'time',
            title:'Now',
            store:this.nowLineStore,
            showInLegend: true,
            style: {
                strokeStyle: 'blue'
            }
        };
        runlinesSeries.push(nowLineSeries);
        
        
        for(var trainLabel in trainStores){
            var trainStore = trainStores[trainLabel];
           
            var trainSeries = {
                type:'line',
                title:'Train' + trainLabel,
                store: trainStore,
                xField:'position',
                yField:'time',
                showMarkers:true,
                label:{
                     display:'over',
                     field:'trainLabel'
                },
                marker:{
                    type:'circle',
                    fill:'black'
                },
                highlight: {
                        size: 7,
                        radius: 7
                },
                // tooltip: {
                //         trackMouse: true,
                //         width:140,
                //         height:28,
                //         renderer: function(storeItem, item) {
                //             var time  = new Date(storeItem.get('time'));
                       
                //             this.setHtml(time.getUTCHours() + ':' + time.getUTCMinutes() + 'At Location: ' +  storeItem.get('position') + ' Track Nr:' + storeItem.get('track'));
                //         }
                //     },
                style:{
                    strokeStyle:'black'
                }
            };
            
            runlinesSeries.push(trainSeries);
        }

        runlinechart.setSeries(runlinesSeries);
        runlinechart.scheduleLayout();
        runlinechart.redraw();
        console.log(runlinechart);

    },
    updateNowLine: function(nowTime){
        var runlinechart = this.lookupReference('runlinechart');
        var runlinesSeries = runlinechart.getSeries();
        var nowStore = this.nowLineStore;
        nowStore.removeAll();
        console.log('INSIDE UPDATE NOW LINE');

        var dataPoint0 = {};
        dataPoint0.time = nowTime;
        dataPoint0.position = 0;

        var dataPoint1 = {};
        dataPoint1.time = nowTime;
        dataPoint1.position = 100;
        var dataPoints = [];
        dataPoints.push(dataPoint0);
        dataPoints.push(dataPoint1);
        nowStore.add(dataPoints);

    },
    updateRunlineChart: function(){
        var trainLabels = ['FIRST', 'SECOND', 'TN4711','NEW111','NEW222'];
        var msgs = [];
        var msg = {"position": undefined, "time":undefined , "kind":1, "trainLabel": undefined, "track": 0 };
        var currDate = new Date();
        var currTimeStamp = currDate.getTime();
        var idx = Math.round(this.random(4,0));

        msg.time = currTimeStamp;
        msg.position = this.random(100,0);
        msg.trainLabel = trainLabels[idx];
        msgs.push(msg);
        var subscribedTrains = this.subscribedTrains;
        var me = this;
        var runlinechart = me.lookupReference('runlinechart');
        var runlinesSeries = runlinechart.getSeries();
        var timeAxis = runlinechart.getAxis(0);
        //get this from server may be?
        
        var currTime = currDate.getTime();
        var fromDate = currTime - 1000 * 60 * 10;
        var toDate = currTime + 1000 * 60 * 15;

        timeAxis.setFromDate(fromDate);
        timeAxis.setToDate(toDate);

        me.updateNowLine(currTime);

        
        //1- add messages to their corresponding stores or create new store if necessary
        msgs.forEach(function(record){
            var store = subscribedTrains[record.trainLabel];

            if(store){
                console.log('Already Existing Train');
                console.log(record.trainLabel);
                store.add(record);
                        
            }
            else{
                //because this is a new train and thus a new series for the chart, update the chart series
                console.log('NEW TRAIN');
                console.log(record.trainLabel);
                var trainStore = Ext.create('MyApp.store.Messages');
                trainStore.add(record);
                subscribedTrains[record.trainLabel] = trainStore;
                //add series with the above store
                var trainSeries = {
                    type:'line',
                    title:'Train' + record.trainLabel,
                    store: trainStore,
                    xField:'position',
                    yField:'time',
                    showMarkers:true,
                    // label:{
                    //     display:'over',
                    //     field:'trainLabel'
                    // },
                    marker:{
                        type:'circle',
                        fill:'black'
                    },
                    highlight: {
                        size: 7,
                        radius: 7
                    },
                    // tooltip: {
                    //      trackMouse: true,
                    //      width:140,
                    //      height:28,
                    //      renderer: function(storeItem, item) {
                    //          var time  = new Date(storeItem.get('time'));
                        
                    //          this.setHtml(time.getUTCHours() + ':' + time.getUTCMinutes() + 'At Location: ' +  storeItem.get('position') + ' Track Nr:' + storeItem.get('track'));
                    //      }
                    //  },
                    style:{
                        strokeStyle:'black'
                    }
                };
            
                runlinesSeries.push(trainSeries);
            }});
        runlinechart.setSeries(runlinesSeries);
        runlinechart.scheduleLayout();
        runlinechart.redraw();
        
    },
    random: function(high, low){
        return Math.random() * (high - low) + low;
    }
});
