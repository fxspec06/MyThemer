enyo.kind({
	name: "Neo.Spinner",
	components: [
		//{kind: "jmtk.Spinner", name: "jmtkSpinner", color: "#FFFFFF", showing: false},
		{kind: "onyx.Spinner", name: "onyxSpinner", showing: false}
	],
	
	show: function() {
		this.inherited(arguments);
		if (/* setting for jmtk spinner */ true) {
			if (this.$.onyxSpinner.showing) {
				this.$.onyxSpinner.hide();
			}
		}
		else {
			this.$.onyxSpinner.show();
		}
	}
});