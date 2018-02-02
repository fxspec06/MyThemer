enyo.kind({
	name: 'Neo.ThemeManager',
	classes: 'neo-themes',
	layoutKind: 'FittableRowsLayout',
	style: '',
	fit: true,
	
	events: {
		onClose: ''
	},

	published: {
		defaultThemes: ['neo', 'aqua']
	},
	
	components: [
		
		{name: 'themeBox', classes: 'enyo-fit', layoutKind: 'FittableRowsLayout', fit: true, components: [

			{name: 'toptool', kind: 'Neo.Toolbar', header: 'Tweak Elements', onClose: 'close', closeable: true, right: [
				{name: 'caption', classes: 'neo-themes-caption', content: 'Change everything. Again.'}
			]},
			
			{name: 'spinner', kind: 'Neo.Spinner', showing: false},


			//{content: 'Customize your theme', classes: 'onyx-groupbox-header'},
			//{name: 'livePreview', saveable: true, style: 'margin:auto;'},
			{kind: 'Scroller', fit: true, touch: true, thumb: false, components: [
				{content: 'Default Themes', classes: 'onyx-groupbox-header'},
				/*{style: 'max-width: 300px; text-align: center; margin: auto;', classes: 'compose onyx-groupbox', components: [
					{kind: 'onyx.InputDecorator', components: [
						{name: 'nameInput', kind: 'onyx.Input', style: 'width: 200px; color: black;',
							oninput: 'keypress'},
					]}
				]},*/

				//{style: 'max-width: 300px; text-align: center; margin: auto; border: none;', classes: 'onyx-groupbox', components: [
					{name: 'themeList', kind: 'Repeater', fit: true, onSetupItem: 'setupThemes', components: [
						{name: 'button', kind: 'Neo.Button', ontap: 'loadTheme'},
					]}
				//]}
			]},



			{name: 'bottomtool', kind: 'Neo.Toolbar', middle: [
				{name: 'back', kind: 'Neo.Button', ontap: 'close', text: 'Back', icon: 'back'},
				/*{kind: 'Neo.Button', ontap: 'close', text: 'Close', icon: 'close'},
				{name: 'deleteTheme', kind: 'Neo.Button', ontap: 'deleteTheme', text: 'Delete', icon: 'delete'},
				{name: 'save', kind: 'Neo.Button', ontap: 'save', text: 'Save', icon: 'save'},
				{name: 'load', kind: 'Neo.Button', ontap: 'load', text: 'Load', icon: 'load'},
				{name: 'email', kind: 'Neo.Button', ontap: 'email', text: 'Email', icon: 'email'}*/
			]},
		]},

		
		
		
 	],
 	
 	create: function() {
		 this.inherited(arguments);
		 console.log('IN THEME MANAGER');
		 this.$.themeList.setCount(this.defaultThemes.length);
		 this.$.themeList.render();
	},

	setupThemes: function(s, e) {
		var _i = e.index,
			btn = e.item.$.button;
		
		btn.setText(this.defaultThemes[_i]);
		btn.$.themer.setTheme(this.defaultThemes[_i]);
	},



	
	close: function() {
		this.spinner(false);
		this.bubbleUp('destroyBox');
	},
      
     spinner: function(onoff) {
          this.log(onoff ? 'showing' : 'hiding');
          //this.$.spinner[onoff ? 'start' : 'stop']();
          this.$.spinner.setShowing(onoff);
          this.reflow();
          this.render();
    },




    loadTheme: function(s, e) {
		this.spinner(true);

		var _i = e.index;
		var theme = this.defaultThemes[_i];
		enyo.Signals.send('loadThemeFromManager', {theme: theme});
		setTimeout(function(){
			resetApp();
		}.bind(this), 0);
    }
});