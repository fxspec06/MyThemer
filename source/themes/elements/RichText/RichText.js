/**
 * This overrides the getValue method so we get back text, even though the
 * RichText field has HTML in it. Lets us use a trailing space in value.
 * Adds getCharCount() method to get length based on non-html value
 */
enyo.kind({
	name: "Neo.RichText",
	kind: "onyx.RichText",
	defaultFocus: true,
	richContent: true, // this needs to always be true – don't publish
	
	
	/*
		moveCursor
		moveCursorToEnd
		moveCursorToStart
		selectAll
		insertAtCursor
		placeholder
		modifySelection
		removeSelection
	 */
	published: {
		maxTextHeight: null,
		selection: null,
		
		// for theming
			sample: false,
			preview: false,
	},
	handlers: {
		onfocus: "focusHandler",
		onblur: "blurHandler",
		ontap: "tapHandler"
	},
	
	themes: {
		neo: {
			styles: {
				backgroundColor:"rgb(0,0,0)",
				textColor:"rgb(255,255,255)",
				textSize:"23px",
				textWeight: "900",
				letterSpacing: "",
				
				//width: 200px; min-height: 75px;
				//text-align: left;
				
				borderColor: "#4A4A4A",
				borderWidth: "15px",
				
				textTransform: "",
				
				padding: "", // px
				margin: "5px", // px
				
				width: "250px",
			},
			classes: ""
		},
		aqua: {
			styles: {
				"backgroundColor":"teal",
				"textColor":"#CCC",
				textSize:"1em",
				"letter-spacing":"",
				"border-color":"white",
				
				//width: 200px; min-height: 75px;
				//text-align: left;
				
				borderWidth: "15px",
				
				textTransform: "",
				
				padding: "", // px
				margin: "5px", // px
				
				width: "250px",
			},
			classes: ""
		},
		onyx: {
			styles: {
				"backgroundColor": "#353839",
				"textColor":"#00",
				textSize:"1em",
				"letter-spacing":"",
				"border-color":"white",
				
				//width: 200px; min-height: 75px;
				//text-align: left;
				
				borderWidth: "15px",
				
				textTransform: "",
				
				padding: "", // px
				margin: "5px", // px
				
				width: "250px"
			}, highlight: {}
		},
		neo_alternate: {
			styles: {
				"backgroundColor": "rgb(14,44,58)",
				"textColor":"rgb(189, 183, 107)",
				textSize:"1em",
				"letter-spacing":"-2px",
				"border-color":"rgb(184, 134, 11)",
				
				//width: 200px; min-height: 75px;
				//text-align: left;
				
				borderWidth: "15px",
				
				textTransform: "",
				
				padding: "", // px
				margin: "5px", // px
				
				width: "250px"
			}, highlight: {}
		},
		white: {
			styles: {
				"backgroundColor": "rgb(255, 255, 255)",
				"textColor":"rgb(0,0,0)",
				textSize:"1em",
				"letter-spacing":"-2px",
				"border-color":"rgb(0, 0, 0)",
				
				//width: 200px; min-height: 75px;
				//text-align: left;
				
				borderWidth: "15px",
				
				textTransform: "",
				
				padding: "", // px
				margin: "5px", // px
				
				width: "250px"
			}, highlight: {}
		},
	},
	create: function(){
		this.inherited(arguments);
		
		this.container.createComponent(
			{name: "themer", kind: "Neo.ThemeFile", type: "richText", onUpdate: "updateTheme", owner: this},
			{owner: this}
		);
		enyo.mixin(this.container.handlers, {onUpdate: "updateTheme"});
		this.container.updateTheme = this.updateTheme.bind(this);
		
		// required for ALL theme objects
		this.themeObj = this.$.themer.getStatics();
		this.themeChanged();
		this.$.themer.loadSaved();
	},
	//@* theme functions
	//@* override
	themeChanged: function(oldValue){
		var r = this.inherited(arguments);
		
		if (this.hasNode() && (this.preview === true || this.sample === true)) {
			this.setValue("");
			this.setValue(this.text);
			//console.log(this)
		} else if (!this.hasNode()) {
			setTimeout(this.themeChanged.bind(this), 100);
		}
		
		return r;
	},
	//@* override
	updateTheme: function(inSender, styles){
		
		this.$.themer.stylize(styles, this.container);
		this.$.themer.stylize(styles, this);
		
		this.container.applyStyle("width","auto");
		/*this.applyStyle("margin", null);
		this.applyStyle("padding", null);
		this.container.applyStyle("margin", null);
		this.container.applyStyle("padding", null);*/
		
		this.themeChanged();
		this.render();
	},
	
	focusHandler: function(){
		var r = this.inherited(arguments);
		if (this.sample === true || this.preview === true) {
			if (this.hasNode()) this.node.blur();
		}
		return r;
	},
	blurHandler: function(){
		var r = this.inherited(arguments);
		return r;
	},
	
	getValue: function() {
		if(!this.hasNode() || (this.preview === true || this.sample === true)) return "";
		this.eventNode.innerHTML = this.eventNode.innerHTML.replace(/\<br\>/g, '');
		this.eventNode.innerHTML = this.eventNode.innerHTML.replace(/(\r\n|\n|\r)/gm, '');
		//console.log("getting value...", this.node.innerHTML)
		//console.log("richtext...",this.getSelection(), this.hasFocus(), this)
		
		return this.eventNode.innerHTML.replace(/&nbsp;/g, ' ');
	},
	getCharCount: function() {
		return this.getValue().length;
	},
	tapHandler: function(){
		if ( (this.sample) && !(this.preview) ) {
			this.$.themer.customize();
			return false;
		}
		if ( (this.preview) ) {
			this.$.themer.preview(this.themePreview);
			return false;
		}
	}
});

