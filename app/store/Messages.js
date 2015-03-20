Ext.define('MyApp.store.Messages',{
    
    extend: 'Ext.data.Store',
    requires: [
        'MyApp.model.Message'
    ],
    model: 'MyApp.model.Message',
    autoLoad: false
});