import * as yup from 'yup';

const supported_extensions = [
  '.js',
  '.py',
  '.java',
  '.cpp',
  '.c',
  '.html',
  '.css',
  '.json',
  '.xml',
  '.md'
];

const roomSchema = yup.object().shape({
  roomName: yup
    .string()
    .required('Room name is required')
    .min(2, 'Room name must be at least 2 characters')
    .max(50, 'Room name must be at most 50 characters'),
  file: yup
    .mixed()
    .required('A file is required')
    .test(
      'fileType',
      'Only .js, .py, .java, .cpp, .c, .html, .css, .json, .xml, .md files are allowed.',
      (value) => {
        console.log(value)
        if (!value) return false;
        const extension = value.name?.split('.').pop()?.toLowerCase();
        return supported_extensions.includes(`.${extension}`);
      }
    )
});

export default roomSchema;