// import { Plugin, icons } from '@ckeditor/ckeditor5-core';

// import { View, LabeledFieldView, createLabeledInputText, 
// 		ButtonView, submitHandler,
// 		ContextualBalloon, clickOutsideHandler
// 	} from '@ckeditor/ckeditor5-ui';


// 	// import MathJaxAPI from 'mathjax';

// import MathJaxImg from './icons/mathjax.svg';

// export default class MathJax extends Plugin {
//    static get requires() {
//     return [MathJaxEdit, MathJaxUI];
//    }
// }

// class MathJaxEdit extends Plugin {
//     _defineSchema() {
// 		const schema = this.editor.model.schema;

//     	// Extend the text node's schema to accept the abbreviation attribute.
// 		schema.extend( '$text', {
// 			allowAttributes: [ 'class' ]
// 		} );
// 	}
// 	_defineConverters() {
// 		const conversion = this.editor.conversion;
		
//         // Conversion from a model attribute to a view element
// 		conversion.for( 'downcast' ).attributeToElement( {
// 			model: 'mathjax',

//             // Callback function provides access to the model attribute value
// 			// and the DowncastWriter
// 			view: ( modelAttributeValue, conversionApi ) => {
// 				const { writer } = conversionApi;
// 				console.log(modelAttributeValue);
// 				return writer.createAttributeElement( 'span', {
// 					class: 'math-tex',
// 					innerHTML: modelAttributeValue
// 				} );
		
// 				// await MathJaxAPI.init({
// 				// 		loader: {load: ['input/tex', 'output/svg']}
// 				// }).then((MathJax) => {
// 				// 	return MathJax.tex2svg(modelAttributeValue, {display: true});
// 				// })
// 			}
// 		} );

// 		// Conversion from a view element to a model attribute
// 		conversion.for( 'upcast' ).elementToAttribute( {
// 			view: {
// 				name: 'span',
// 				attributes: [ 'class', 'innerHTML' ]
// 			},
// 			model: {
// 				key: 'mathjax',

//                 // Callback function provides access to the view element
// 				value: viewElement => {
// 					console.log(viewElement);
// 					const className = viewElement.getAttribute( 'class' );
// 					const innerHTML = viewElement.getAttribute('innerHTML');
// 					return [className, innerHTML];
// 				}
// 			}
// 		} );									
// 	}
// }

// class MathJaxUI extends Plugin {
//     static get requires() {
//         return [ContextualBalloon];
//     }

//     init() {
//         const editor = this.editor;
//         this._balloon = this.editor.plugins.get( ContextualBalloon );
// 		this.formView = this._createFormView();

// 		editor.ui.componentFactory.add( 'mathjax', () => {
// 			const button = new ButtonView();

// 			button.label = 'Insert Math Formulas';
//             button.icon = MathJaxImg;
// 			button.tooltip = true;

// 			// Show the UI on button click.
// 			this.listenTo( button, 'execute', () => {
// 				this._showUI();
// 			} );

// 			return button;
// 		} );
//     }
// 	_createFormView() {
// 		const editor = this.editor;
// 		const formView = new FormView( editor.locale );

// 		// Execute the command after clicking the "Save" button.
// 		this.listenTo( formView, 'submit', () => {
// 			// Grab values from the abbreviation and title input fields.
// 			const mathTex = formView.mathTexInputView.fieldView.element.value;

// 			editor.model.change( writer => {
// 				try {
// 					console.log(mathTex);
// 					const viewFrag = editor.data.processor.toView(mathTex);
// 					const modelFrag = editor.data.toModel(viewFrag);
				
// 					editor.model.insertContent(modelFrag);
// 				} catch(e) {
// 					console.log("error at insert content" + e);
// 				}
// 			} );

//             // Hide the form view after submit.
// 			this._hideUI();
// 		} );

// 		// Hide the form view after clicking the "Cancel" button.
// 		this.listenTo( formView, 'cancel', () => {
// 			this._hideUI();
// 		} );

// 		// Hide the form view when clicking outside the balloon.
// 		clickOutsideHandler( {
// 			emitter: formView,
// 			activator: () => this._balloon.visibleView === formView,
// 			contextElements: [ this._balloon.view.element ],
// 			callback: () => this._hideUI()
// 		} );

// 		return formView;
// 	}

// 	_showUI() {
// 		this._balloon.add( {
// 			view: this.formView,
// 			position: this._getBalloonPositionData()
// 		} );

// 		this.formView.focus();
// 	}

// 	_hideUI() {
// 		// Clear the input field values and reset the form.
// 		this.formView.mathTexInputView.fieldView.value = '';
// 		this.formView.element.reset();

// 		this._balloon.remove( this.formView );

// 		// Focus the editing view after inserting the abbreviation so the user can start typing the content
// 		// right away and keep the editor focused.
// 		this.editor.editing.view.focus();
// 	}
// 	_getBalloonPositionData() {
// 		const view = this.editor.editing.view;
// 		const viewDocument = view.document;
// 		let target = null;

// 		// Set a target position by converting view selection range to DOM
// 		target = () => view.domConverter.viewRangeToDom( viewDocument.selection.getFirstRange() );

// 		return {
// 			target
// 		};
// 	}
// }

// class FormView extends View {
//     constructor(locale) {
//         super(locale);
//         this.mathTexInputView = this._createInput('Insert your LaTeX math notation here');
//         // this.linkView = this._createLink('Basic Formulas', 'https://en.wikibooks.org/wiki/LaTeX/Mathematics');

// 		this.saveButtonView = this._createButton( 'Save', icons.check, 'ck-button-save' );
// 		this.saveButtonView.type = 'submit';

//         this.cancelButtonView = this._createButton( 'Cancel', icons.cancel, 'ck-button-cancel' );
// 		this.cancelButtonView.delegate( 'execute' ).to( this, 'cancel' );

//         this.childViews = this.createCollection( [
//             this.mathTexInputView,
// 			this.saveButtonView,
// 			this.cancelButtonView
// 		]);

//         this.setTemplate( {
// 			tag: 'form',
// 			attributes: {
// 				class: [ 'ck', 'ck-abbr-form' ],
// 				tabindex: '-1'
// 			},
// 			children: this.childViews
// 		} );
//     }

//     render() {
// 		super.render();

// 		// Submit the form when the user clicked the save button or pressed enter in the input.
// 		submitHandler( {
// 			view: this
// 		} );
// 	}

// 	focus() {
// 		this.childViews.first.focus();
// 	}

// 	_createInput( label ) {
// 		const labeledInput = new LabeledFieldView( this.locale, createLabeledInputText );

// 		labeledInput.label = label;

// 		return labeledInput;
// 	}

// 	_createButton( label, icon, className ) {
// 		const button = new ButtonView();
    
// 		button.set( {
// 			label,
// 			icon,
// 			tooltip: true,
// 			class: className
// 		} );

// 		return button;
//     }
// }