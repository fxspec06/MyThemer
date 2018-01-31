enyo.kind({
	name: 'Neo.Themes_basic',
	classes: 'neo-themes',
	
	kind: 'Scroller',
	touch: true,
	style: 'color: white;',
	fit: true,
	
	events: {
		onClose: ''
	},
	
	colors: ['custom', 'transparent', 'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen', 'yellowgreen'],
	
	published: {
		
	},
	
	components: [
		/*
		{content: 'Primary color'},
		{name: 'pri', kind: 'Neo.Themes_ColorSquare'},
		{content: 'Secondary color'},
		{name: 'sec', kind: 'Neo.Themes_ColorSquare'},
		{content: 'Alternate color'},
		{name: 'alt', kind: 'Neo.Themes_ColorSquare'},
	    */
	   {content: 'COMING SOON...', style: 'color: red; text-transform: italics;'},
		{fit: true},
		
		{name: 'bottomtool', kind: 'Neo.Toolbar', middle: [
			//{kind: 'Neo.Button', ontap: 'close', text: 'Apply', icon: 'close'},
			{kind: 'Neo.Button', ontap: 'close', text: 'Cancel', icon: 'close'},
		]},
		
		
 	],
 	
 	create: function() {
 		this.inherited(arguments);
 		
 		
 	},
 	
 	//FIXME
	//TODO
	//@* event
	//@* close button tapped || private call
	//@* closes themes
	close: function(s, e) {
		this.log();
		this.bubbleUp('destroyBox');
		/*this.reset();
		enyo.Signals.send('setFullscreen', false);
		this.doClose();*/
	},
});