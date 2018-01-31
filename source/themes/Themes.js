enyo.kind({
	name: 'Neo.Themes',
	classes: 'neo-themes',
	layoutKind: 'FittableRowsLayout',
	
	events: {
		onClose: ''
	},
	
	colors: ['custom', 'transparent', 'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen', 'yellowgreen'],
	
	components: [
		{name: 'signals', kind: 'Signals', customize: 'customize'},
		
		{kind: 'Neo.Toolbar', header: 'Themes', onClose: 'close', closeable: true, right: [
			{name: 'caption', classes: 'neo-themes-caption'}
		]},
		
		{name: 'box', fit: true, kind: 'FittableRows', destroyBox: 'destroyBox'},
		
		{kind: 'Neo.Toolbar', middle: [
			{kind: 'Neo.Button', ontap: 'basic', text: 'Basic', icon: 'magnet'},
   			{kind: 'Neo.Button', ontap: 'adv', text: 'Advanced', icon: 'lab'}
   		], left: [
			{kind: 'Neo.Button', ontap: 'help', icon: 'help'},
		]},
	],
	
	
	//@* override
	create: function() {
		this.inherited(arguments);
		//this.publishedDefaults = copy(this.published);
		//this.adv();
	},
	destroyBox: function(s, e) {
		this.log();
		this.$.box.destroyClientControls();
		this.render();
		this.reflow();
		this.$.caption.setContent('');
		return false;
	},
	adv: function(s, e) {
		this.destroyBox();
		this.$.box.createComponent(
				{name: 'adv', kind: 'Neo.TweakElements', fit: true, layoutKind: 'FittableRowsLayout'},
				{owner: this}
		);
		this.$.box.render();
		this.$.caption.setContent('ADVANCED');
		this.reflow();
		this.$.adv.reset();
	},
	basic: function(s, e) {
		this.destroyBox();
		this.$.box.createComponent(
				//{name: 'basic', fit: true, layoutKind: 'FittableRowsLayout', content: 'COMING SOON...', classes: 'neo-themes-caption'},
				{name: 'basic', kind: 'Neo.QuickTheme', fit: true, layoutKind: 'FittableRowsLayout'},
				{owner: this}
		);
		this.$.box.render();
		this.$.caption.setContent('BASIC');
		this.reflow();
		//this.$.basic.reset();
	},
	help: function(s, e) {
		alert('COMING SOON...', this);
	},
	//@* event
	//@* close button tapped || private call
	//@* closes themes
	close: function(s, e) {
		//this.reset();
		enyo.Signals.send('setFullscreen', false);
		this.doClose();
	},
});