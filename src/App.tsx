import React, { FC, useState } from 'react';
import './App.css';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="gd-url" label="共有可能なGoogleDriveの画像URL" variant="outlined" onChange={handleUrlChange} />
            <TextField id="img-string" label="リンクテキスト" variant="outlined" onChange={handleTextChange} />
          </form>          
        </div>
        <div>
          <span className={classes.link}>{mdLink}</span>
        </div>
      </header>
    </div>
  );
}

export default App;
