enyo.kind({
	name: "Neo.Themes_ColorSquare",
	
	kind: 'FittableColumns',
	
	style: 'width: 200px; height: 100px; margin: auto; border: 2px solid white;',
	
	published: {
		color: '', // hex
	},
	
	handlers: {
		ontap: 'handleTapped',
	},
	
	components: [
		{name: 'nocolmsg', showing: false, style: 'color: white;', content: 'Tap to choose...'}
	],
	
	create: function() {
		this.inherited(arguments);
		
		// init
		this.colorChanged();
	},
	
	
	
	//@* handlers
	//@* called when tapping on the color square
	handleTapped: function(s, e) {
		this.openPicker();
	},
	
	//@* automatically called
	//@* sets the color
	colorChanged: function(oldColor) {
		if (!this.color) this.setNoColor();
		else this.applyStyle('background-color', this.color);
	},
	
	//@* public
	//@* shows the word 'choose' in the middle of the square to let user know no color is selected
	setNoColor: function() {
		this.$.nocolmsg.setShowing(true);
		this.applyStyle('background-color', null);
	},
	
	//@* public
	//@* sets the color
	setColor: function(inColor) {
		this.$.nocolmsg.setShowing(false);
		this.applyStyle('background-color', this.color);
	},
	
	//@* opens secondary screen
	//@* presents the user with fancy dancy 3rd world full screen selection mechanism
	openPicker: function() {
		console.log('opening picker........');
	}
	
});