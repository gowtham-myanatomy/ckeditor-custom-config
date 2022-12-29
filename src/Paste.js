import { Plugin } from "@ckeditor/ckeditor5-core";
import { ButtonView } from "@ckeditor/ckeditor5-ui";
import PasteImg from './icons/paste.svg';
import { HtmlDataProcessor } from "@ckeditor/ckeditor5-engine";


export default class Paste extends Plugin {
    init() {
        const editor = this.editor;
        const dp = new HtmlDataProcessor();
        editor.ui.componentFactory.add('customPaste', locale => {
            const view = new ButtonView(locale);
            view.set( {
                label: 'Paste',
                icon: PasteImg,
                tooltip: true
            });

            view.on('execute', () => {
                navigator.clipboard.read().then((items) => {
                    for(const item of items) {
                        for(const types of item.types) {
                            item.getType(types).then((value) => {
                                console.log(value);
                            })
                        }
                    }
                });
                navigator.clipboard.readText().then((text) => {
                    console.debug(text);
                    const viewFragment = dp.toView(text);
                    const modelFragment = editor.data.toModel(viewFragment);
                    editor.model.insertContent(modelFragment);
                });
            })
            return view;
        });
    }
}