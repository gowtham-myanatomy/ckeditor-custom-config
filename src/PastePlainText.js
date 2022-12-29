import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Command from '@ckeditor/ckeditor5-core/src/command';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import PastePlainTextImg from './icons/paste-plain-text.svg';
import plainTextToHtml from '@ckeditor/ckeditor5-clipboard/src/utils/plaintexttohtml';

export default class PasteAsPlainText extends Plugin {
    static get pluginName() {
        return 'PasteAsPlainText'
    }

    static get requires() {
        return [ PastePlainTextUI, PastePlainTextCommand ]
    }

    init() {
        const editor = this.editor;

        editor.commands.add( 'pastePlainText', new PastePlainTextCommand( editor ) );

        // The logic responsible for converting HTML to plain text.
        const clipboardPlugin = editor.plugins.get( 'ClipboardPipeline' );
        const command = editor.commands.get( 'pastePlainText' );
        const editingView = editor.editing.view;

        editingView.document.on( 'clipboardInput', ( evt, data ) => { 
            if ( editor.isReadOnly || !command.value ) {
                return;
            }

            const dataTransfer = data.dataTransfer;
            let content = plainTextToHtml( dataTransfer.getData( 'text/plain' ) );

            data.content = this.editor.data.htmlProcessor.toView( content );
        } );
    }
};

class PastePlainTextUI extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'pasteAsPlainText', locale => {
            const view = new ButtonView( locale );
            const command = editor.commands.get( 'pastePlainText' );

            view.set( {
                label: 'Paste as plain text',
                icon: PastePlainTextImg,
                tooltip: true,
                isToggleable: true
            } );

            // A callback executed once the button is clicked.
            view.on( 'execute', () => {
                editor.execute( 'pastePlainText' );
            } );

            view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            return view;
        } );
    }
};

class PastePlainTextCommand extends Command {
    refresh() {
        // Disable the command if the editor is in read-only mode.
        this.isEnabled = !this.editor.isReadOnly;
    }

    execute() {
        // Activate pasting plain text.
        this.value = !this.value;
    }
}
