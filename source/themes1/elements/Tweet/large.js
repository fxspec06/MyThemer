enyo.kind({
	name: "Neo.Tweet.large",
	kind: "Neo.Tweet.small",
	
	tweetChanged: function() {
		this.inherited(arguments);
		this.$.tweet.applyStyle("font-size","1.5em !important");
	}
});
