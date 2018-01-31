enyo.kind({
	name: 'Neo.SearchPopup',
	kind: 'FittableRows',
	
	style: 'text-align: center;',
	
	events: {
		onClose: ''
	},
	
	published: {
		active: 'topics'
	},
	
	components: [
		{kind: 'Neo.Toolbar', header: 'Search', closeable: true},
		{components: [
			{tag: 'hr'},
			{name: 'radioGroup', kind: 'onyx.RadioGroup', layoutKind: 'FittableColumnsLayout', 
				fit: true, style:'margin:15px; text-align: center;', onActivate: 'radioActivate', components: [
					{name: 'topics', kind: 'Neo.Button', text: 'Topics', active: true},
					{name: 'users', kind: 'Neo.Button', text: 'Users', blue: false}
			]},
			{kind: 'onyx.InputDecorator', components: [
				{name:'searchTextBox', kind: 'Neo.RichText', onkeydown: 'searchBoxKeydown'},
			]},
			{tag: 'hr'},
		]},
		{kind: 'Neo.Toolbar',
			left: [
				{kind: 'onyx.PickerDecorator', components: [
					{kind: 'onyx.PickerButton', classes: 'neo-button'},
					{name: 'accountSelection', kind: 'Neo.PopupList', onSelect: 'accountChange'}
				]},
			],
			right: [{name: 'searchButton', kind: 'Neo.Button', ontap: 'search', text: 'Search', icon: 'search'}]
		}
	],
	
	//@* override
	create: function() {
		this.inherited(arguments);
	},
	
	
	//@* events
	
	//@* private
	//@* on search box key
	searchBoxKeydown: function(s, e) {
		//@* enter key
		if (e.keyCode === 13) {
			this.search();
			e.preventDefault();
		}
	},
	
	//@* private
	//@* radio button activate
	radioActivate: function(s, e) {
		var _r = e.originator.container || {};
		if (_r.active != true) return;
		switch (_r.name) {
			case 'users':
				this.$.searchTextBox.setPlaceholder('Enter username...');
				this.setActive('users');
				break;
			case 'topics': default:
				this.$.searchTextBox.setPlaceholder('Enter query...');
				this.setActive('topics');
				break;
		}
	},
	
	//@* public
	//@* calls the search
	search: function() {
		var _stb = this.$.searchTextBox,
			_as = this.$.accountSelection;
		switch (this.active) {
			case 'users':
				var _a = App.Users.get(_as.selected.value),
					_u = _stb.getValue().replace('@', '');
				AppUI.viewUser(_u, _a.type, _a.id);
				this.close();
				break;
			case 'topics':
			default:
				AppUI.search(_stb.getValue(), _as.selected.value);
				this.close();
				break;
		}
	},
	
	
	buildAccounts: function() {
		var allusers = App.Users.getAll();
		this.accounts = [];
		for (var key in allusers) {
			this.accounts.push({
				id: allusers[key].id,
				value: allusers[key].id,
				content: allusers[key].username,
				type: allusers[key].type,
				active: (allusers[key].id === App.Prefs.get('currentUser'))
			});
		}
		this.$.accountSelection.createComponents(this.accounts, {owner: this} );
		this.$.accountSelection.render();
	},
	
	
	
	
	//@* private
	//@* resets the search popup
	reset: function() {
		this.active = 'topics';
		this.$.searchTextBox.setValue('');
		this.$.searchTextBox.focus();
		this.buildAccounts();
	},
	
	//@* private
	//@* closes the search box
	close: function() {
		this.doClose();
	},
});
