/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PictureEditing from '@ckeditor/ckeditor5-image/src/pictureediting';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';

import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace';
import SelectAll from '@ckeditor/ckeditor5-select-all/src/selectall';


import { ExportPdf } from '@ckeditor/ckeditor5-export-pdf';
import LineHeight from '@zhufusheng/ckeditor5-lineheight';
import { Strikethrough, Subscript, Superscript, Underline } from '@ckeditor/ckeditor5-basic-styles';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';



import {
    Emoji, EmojiActivity, EmojiFlags, EmojiFood, EmojiNature, EmojiObjects, EmojiPeople,
    EmojiPlaces, EmojiSymbols
} from '@phudak/ckeditor5-emoji/src';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials';
import Font from '@ckeditor/ckeditor5-font/src/font';
import FullScreen from './FullScreen';
import PasteAsPlainText from './PastePlainText';
import Mathematics from 'ckeditor5-math/src/math';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	SimpleUploadAdapter,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	// PasteFromWord,
	// Paste,
	PasteAsPlainText,
	Mathematics,
	List,
	MediaEmbed,
	Essentials,
	Paragraph,
	PictureEditing,
	Table,
	TableToolbar,
	TextTransformation,
	Heading,
	Autoformat,
	SourceEditing,
	PasteFromOffice,
	FindAndReplace,
	SelectAll,
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Subscript,
	Superscript,
	RemoveFormat,
	Indent,
	BlockQuote,
	Alignment,
	Link,
	// Anchor,
	HorizontalLine,
	Emoji, EmojiActivity, EmojiFlags, EmojiFood, EmojiNature, EmojiObjects, EmojiPeople, EmojiPlaces, EmojiSymbols,
	SpecialCharacters, SpecialCharactersEssentials,
	ExportPdf,
	CloudServices,
	Font,
	LineHeight,
	FullScreen
];



// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'sourceEditing',
			'|',
			// content template
			'|',
			// 'pasteFromWord',
			// 'customPaste',
			'pasteAsPlainText',
			// cut, copy, paste ,paste plain text, paste from word
			'|',
			'undo',
			'redo',
			'|',
			'findAndReplace',
			'selectAll',
			'|',
			// 'heading',
			'bold',
			'italic',
			'underline',
			'strikeThrough',
			'subscript',
			'superscript',
			'|',
			// copy formatting
			'removeFormat',
			'|',
			'numberedList',
			'bulletedList',
			'|',			
			'outdent',
			'indent',
			'|',
			'blockQuote',
			'|',
			'alignment',
			'|',
			'link',
			// 'anchor',
			// anchor custom create
			'|',
			'uploadImage',
			// 'mediaEmbed',
			'insertTable',
			'horizontalLine',
			'emoji',
			'specialCharacters',
			'|',
			'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
			'lineHeight',
			'|',
			'fullScreen',
			'exportPdf',
			'math'
		],
		shouldNotGroupWhenFull: true
	},
	image: {
		toolbar: [
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side',
			'|',
			'toggleImageCaption',
			'imageTextAlternative'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	lineHeight: { // specify your otions in the lineHeight config object. Default values are [ 0, 0.5, 1, 1.5, 2 ]
		options: [ 0.5, 1, 1.5, 2, 2.5, 3, 4 ]
	},
	alignment: {
		options: ['left','right', 'center', 'justify']
	},
	fontSize: {
		options: ['default', 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48]
	},
	fontFamily: {
		supportAllValues: true,
	},
  	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
