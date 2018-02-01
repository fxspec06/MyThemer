enyo.kind({
// Neo.Tweet
	name: 'Neo.Tweet',
	
	// handlers
		handlers: {
			ontap: 'tweetTap',
			onhold: 'activateHold',
			onmouseup: 'tweetHold',
		},
	
	// events
		events: {
			onTweetTap: '',
			onTweetHold: ''
		},
	
	// published
		published: {
			tweet: '',
			tweetClass: 'normal',
			ignoreUnread: false,
			_hold: false,
			
			// for theming
				sample: false,
				preview: false,
				theme: ''
		},
	// components
	components: [
		{name: 'themer', kind: 'Neo.ThemeFile', type: 'tweet', onUpdate: 'updateTheme'},
		{name: 'tweet', classes: 'neo neo-tweet'},
		{name: "images"},
	],
	
	//@* override
	create: function() {
		this.inherited(arguments);
		this.$.themer.loadSaved();
	},
	
	//@* theme functions
	//@* override
	themeChanged: function(oldValue) {
		var r = this.inherited(arguments),
			_def = this.$.themer.getDefaults();
		
		this.$.tweet.destroyClientControls();
		this.$.tweet.createComponents(_def.theme, {owner: this});
		return r;
	},
	//@* override
	updateTheme: function(s, styles) {
		this.themeChanged();
		this.tweetChanged();
		this.$.themer.stylize(styles, this.$.tweet);
		this.$.themer.stylize(this.$.themer.highlight, this.$.header.$.usernames);
		this.$.tweet.render();
	},
	
	//@* handlers
	tweetTap: function(inSender, inEvent) {
		if (this.sample === true && !this.preview) {
			this.$.themer.customize();
			return false;
		}
		if (this.preview === true) {
			this.$.themer.preview(this.themePreview);
			return false;
		}
		if (this._hold) return;
		this.bubble('onTweetTap', inEvent);
	},
	activateHold: function(inSender, inEvent){
		this._hold = true;
	},
	tweetHold: function(inSender, inEvent) {
		if (!this._hold) return false;
		this._hold = false;
		this.bubble('onTweetHold', inEvent);
	},
	
	//@* private
	tweetClassChanged: function(oldClass) {
		this.removeClass(oldClass);
		this.addClass(this.tweetClass);
	},
	
	// the biggest function
	tweetChanged: function(oldTweet) {
		// make a couple helpers
			var _h = this.$.header,
				_a = this.$.avatar.$,
				_t = this.tweet,
				_class = 'normal',
				body,
				stamp = sch.getRelativeTime(_t.publish_date, {
					now:'now', seconds:'s', minute:'m',
					minutes:'m', hour:'h', hours:'h',
					day:'d', days:'d'
				});
		
		// we use this if there's a repost
			function isRepost(full, user) {
				_h['setRt_full'](enyo.macroize(full, _t));
				_h['setRt_short'](enyo.macroize(user, _t));
			}
		
		// load
			_h.reset();
			_h['setAuthor_full'](enyo.macroize('{$author_fullname}', _t));
			_h['setAuthor_short'](enyo.macroize('{$author_username}', _t));
			this.$.retweet.setShowing(_t.is_repost === true);
			//_a.retweeter.setShowing(_t.is_repost === true);
			_h.setPrivate(_t.author_is_private || _t.is_private_message);
			_h.setFavorite(_t.is_favorite);
			if (_t.author_avatar)
				_a.author.setSrc(_t.author_avatar);
		
		// for retweets and DMs
			if (_t.recipient_username && _t.author_username == _t._orig.SC_user_received_by && _t.is_private_message) {
				//isRepost('{$recipient_fullname}','{$recipient_username}');
				_h['setAuthor_full'](enyo.macroize('{$recipient_fullname}', _t));
				_h['setAuthor_short'](enyo.macroize('{$recipient_username}', _t));
			} else if (_t.is_repost === true) {
				isRepost('{$reposter_fullname}','{$reposter_username}');
				_a.retweeter.setSrc(_t.reposter_avatar);
				this.$.retweet.$.username.setContent(_t.reposter_username);
				this.$.retweet.$.published.setContent(sch.getRelativeTime(_t.publish_date));
			}
		
		// show the unread indicator
			_h.setUnread(_t.read === false && this.ignoreUnread === false);
			//timestamp += '<img align='left' src='assets/images/unread.png' height= '13px' class='tweetHeaderIcon'></img> ';
		
		// set timestamp
			
			if (_t._orig && _t._orig.source) stamp += ' from {$_orig.source}</span>';
			stamp = enyo.macroize(stamp, _t);
			this.$.timestamp.setContent(stamp);
		
		// set tweet class
			if (_t.is_private_message === true) _class = 'message';
				else if (_t.is_mention === true) _class = 'mention';
				else if (_t.is_author === true) _class = 'author';
			this.setTweetClass(_class);
		
		// body stuff.. do we need this ??
			try {
				body = App.Cache.EntriesHTML.getItem(_t.spaz_id);
			} catch(e) {}
			
			if (!body) {
				body = AppUtils.applyTweetTextFilters(_t.text);
				try {
					App.Cache.EntriesHTML.setItem(_t.spaz_id, body);
				} catch(e) { /*console.log(e, 'tweet.js 106', _t)*/ }
			}
			body = enyo.macroize(body + '', _t);
			
			var shurl = new SpazShortURL(),
				urls = shurl.findExpandableURLs(body);
			
			this.$.body.setContent(body);
			
			//console.log(urls);
			
			var self = this;
			if (urls) 
				for (var i in urls) {
					//console.log(urls[i]);
					shurl.expand(urls[i], {
						'onSuccess': enyo.bind(this, function(data) {
							body = shurl.replaceExpandableURL(body, data.shorturl, data.longurl);
							self.$.body.setContent(body);
							self.buildMediaPreviews();
							self.render();
						})
					});
				}
			else this.buildMediaPreviews();
			
	},
	//@* public
	//@* generates media previews for the tweet
	buildMediaPreviews: function() {
		//this.log(this.$.body.getContent())
		var self = this,
			siu = new SpazImageURL(),
			imageThumbUrls = siu.getThumbsForUrls(this.$.body.getContent()),
			imageFullUrls = siu.getImagesForUrls(this.$.body.getContent()),
			i = 0;
		
		//this.log(imageThumbUrls);
		
		this.imageFullUrls = [];
		
		if (imageThumbUrls) {
			//this.log('images found... loading images...')
			for (var imageUrl in imageThumbUrls) {
				var imageComponent = this.$.images.createComponent({
					kind: "Image",
					name: "imagePreview" + i,
					
					style: "height: 10px;",
					ontap: "imageClick",
					src: imageThumbUrls[imageUrl]
				}, {owner: this});
				imageComponent.render();
				this.log(imageUrl);
				this.imageFullUrls.push(imageFullUrls[imageUrl]);
				i++;
			}
		} else {
			jQuery('#'+this.$.tweet.id).embedly({maxWidth: 300, maxHeight:300, method:'afterParent', wrapElement:'div', classes:'thumbnails',
				success: function(oembed, dict) {
					if (oembed.code.indexOf('<embed') === -1)
						// webOS won't render Flash inside an app. DERP.
						self.$.images.createComponent({ kind: "enyo.Control", owner: self, components: [
							{style: "height: 10px;"},
							// {kind: "enyo.Image", style: "max-width: 100%;", ontap: "embedlyClick", src: oembed.thumbnail_url, url: oembed.url},
							{kind: "FittableColumns", pack: "center", components: [
								{name: "oembed_code", allowHtml: true, content:oembed.code}
							]}
						]}).render();
					else enyo.log("skipping oembed with <embed> tag in it", oembed.code);
				}
			});
		}
		this.render();
		this.reflow();
	},
});
