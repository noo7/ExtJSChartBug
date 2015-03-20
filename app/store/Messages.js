Ext.define('MyApp.store.Messages',{
    
    extend: 'Ext.data.Store',
    requires: [
        'MyApp.model.Message'
    ],
    model: 'MyApp.model.Message',
    autoLoad: false,
    proxy:{
    	type:'memory',
    	reader:{
    		type:'json'
    	}
    }
});