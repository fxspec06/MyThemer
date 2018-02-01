enyo.kind({
	name: "Neo.themeSetting",
	published: {
		items:[],
		type:"list",//["list","radio"]
		section:"section",
		title:"setting title",
		description:"longer description"
	},
	components: [
		{name:'section', classes: 'neo-settings-header'},
		{classes:'onyx-toolbar-inline neo-settings-setting', components: [
			{tag: 'table', attributes: {width: '100%'}, components: [
					{tag: 'tr', components: [
						{tag: 'td', attributes: {width: '100%'}, components: [
							{name:'title'},
							{tag: 'br'},
							{name:'description', kind:'Neo.Subtext'}
						]},
						{tag: 'td', attributes: {width: '10%'}, components: [
							{name: 'button', kind: 'Neo.Button', ontap: 'action', bubble: '', collapse: false, style: 'float:right;', classes: 'onyx-negative', blue: false}
						]}
					]}
				]}
			
		]}
	],
	create: function(){
		this.inherited(arguments);
		//this.itemsChanged();
		this.sectionChanged();
		this.titleChanged();
		this.descriptionChanged();
	},
	descriptionChanged: function(oldValue){
		this.$.description.setContent(this.description);
		this.$.description.setShowing(this.description != "longer description");
	},
	titleChanged: function(oldValue){
		this.$.title.setContent(this.title);
	},
	sectionChanged: function(oldValue){
		this.$.section.setContent(this.section);
	},
	itemsChanged: function(oldValue){
		this.$.popupList.destroyClientControls();
		var items = []
		enyo.forEach(this.items, function(item){
			items.push({content:item.content,value:item.value,preferenceProperty:item.preferenceProperty});
		})
		this.$.popupList.createComponents(items, {owner:this});
	},
	requestHide: function(){
		this.$.popupList.requestHide();
		this.inherited(arguments);
	}
})