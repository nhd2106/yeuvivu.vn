import { Editor } from '@tinymce/tinymce-react';

const Admin = (props) => {
    
  const handleChange = data => {
    if (data.mime.includes('image')) {
      const imgTag = `<p><img src="${data.url}" caption="${data.caption}" alt="${data.alternativeText}"></img></p>`;
      const newValue = value ? `${value}${imgTag}` : imgTag;

      onChange({ target: { name, value: newValue } });
    }

    // Handle videos and other type of files by adding some code
  };

    return (
        <Editor
          initialValue="<p>This is the initial content of the editor</p>"
          init={{
            height: 500,
            menubar: false,
            // eslint-disable-next-line @typescript-eslint/camelcase
            convert_urls: false,
            relative_urls : true,
            remove_script_host : true,
            toolbar_mode: 'wrap',
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
              'media codesample fullscreen',
              'hr visualchars imagetools emoticons'
            ],
            toolbar:
            // eslint-disable-next-line no-multi-str
              'undo redo | formatselect forecolor backcolor | \
              bold italic underline strikethrough removeformat | \
              alignleft aligncenter alignright alignjustify | \
              outdent indent | numlist bullist | \
              table link anchor | image media codesample charmap emoticons | \
              fullscreen code'
          }}
          onEditorChange={(content, editor) => {
            handleChange({ target: { name, value: content } });
          }}
          apiKey="t8ck8t9qgh3ezs4rwpivbdaduzgqta0hp1ca61xlo5z7yuyv"
        />
      );
}

export default Admin;