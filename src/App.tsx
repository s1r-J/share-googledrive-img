import React, { FC, useState } from 'react';
import './App.css';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    link: {
      color: 'black'
    }
  }),
);

interface AppProps {
}

const App: React.FC<AppProps> = () => {
  const classes = useStyles();

  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [mdLink, setMdLink] = useState('![]()');
  const [openTip, setOpenTip] = useState(false);

  const changeMdLink = (url: string, text: string) => {
    setMdLink(`![${text}](${url})`);        
  }

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;

    const result = value.match(/^https:\/\/drive.google.com\/file\/d\/([a-zA-z0-9\-]+)\/.+$/);
    const gdid: string = result ? result[1] : '';

    const imageUrl: string = `https://drive.google.com/uc?export=view&id=${gdid}`;
    setUrl(imageUrl);
    changeMdLink(imageUrl, text);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    setText(value);    
    changeMdLink(url, value);
  }

  const handleCloseTip = (): void => {
    setOpenTip(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div></div>
        <div>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="gd-url" label="共有可能なGoogleDriveの画像URL" variant="outlined" onChange={handleUrlChange} />
            <TextField id="img-string" label="リンクテキスト" variant="outlined" onChange={handleTextChange} />
          </form>          
        </div>
        <div>
          <TextField
            id="link"
            label="Markdown記法のリンク"
            value={mdLink}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <Tooltip
                  arrow
                  open={openTip}
                  onClose={handleCloseTip}
                  disableHoverListener
                  placement='bottom'
                  title='コピーしました!'
                >
                  <InputAdornment position="end">
                    <CopyToClipboard
                      text={mdLink}
                      onCopy={(text, result) => setOpenTip(result)}
                    >
                      <IconButton>
                        <AssignmentIcon></AssignmentIcon>
                      </IconButton>
                    </CopyToClipboard>
                  </InputAdornment>
                </Tooltip>
              )
            }}
            variant="filled"
          />
        </div>
        <div></div>
      </header>
    </div>
  );
}

export default App;
