import { Editor } from 'slate';

export const removeMark = (editor) => {
  Editor.removeMark(editor, [
    'bold',
    'italic',
    'underlined',
    'strikethrough',
    'superscript',
    'subscript',
    'fontSize',
    'lineHeight',
    'color',
    'backgroundColor',
    'letterSpacing'
  ]);
};
