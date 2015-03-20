Ext.define('MyApp.model.Message', {
	extend: 'Ext.data.Model',
    fields: [
    	{
        	name: 'time',
       		dateFormat:'timestamp',
        	type: 'date',
            convert: function(val,rec){
                console.log('CONVERTING MESSAGE INSTANCES');
                console.log(val);
                
            }
        },
        {
            name: 'position',
            type: 'float'
        },
        {
            name: 'kind',
            type: 'int'
        },
        {
            name: 'trainLabel',
            type: 'string'
        },
        {
            name:'track',
            type:'int'
        }
    ]
	
});