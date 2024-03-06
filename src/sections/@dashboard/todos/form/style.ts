export default {
  input: {
    border: 'none',
    display: 'block',
    width: '100%',
    position: 'absolute',
    margin: 0,
    top: 0,
    left: 0,
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    letterSpacing: 'inherit',
    height: '100%',
    bottom: 0,
    overflow: 'hidden',
    resize: 'none',
    color: 'inherit',
    minHeight: '32px',
    outline: 'none',
    borderRadius: '6px 6px 0px',
  },

  '&multiLine': {
    control: {
      height: 70,
      border: 'none',
    },
    highlighter: {
      border: '1px solid transparent',
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'white',
      fontSize: 14,
      borderRadius: '5px',
    },
    item: {
      padding: '5px 10px',
      '&focused': {
        backgroundColor: '#EFF9F3',
      },
    },
  },
};
