enyo.kind({
	name: "Neo.setting",
	published: {
		items:[],
		type:"list",//["list","radio"]
		section:"section",
		title:"setting title",
		description:"longer description"
	},
	components: [
		{name:"section", classes: "neo-settings-header"},
			{classes:"onyx-toolbar-inline neo-settings-setting", components: [
				{components: [
					{name:"title"},
					{tag: "br"},
					{name:"description", kind:"Neo.Subtext"}
				]},
				{kind: "onyx.PickerDecorator", style: "float: right;", components: [
					{kind: "onyx.PickerButton"},
					{name: "popupList", kind: "Neo.PopupList", onChange: "setPreference", preferenceProperty: "tweet-text-size"}
			]}
		]}
	],
	create: function(){
		this.inherited(arguments);
		this.itemsChanged();
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