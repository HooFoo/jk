import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import {
  Typography,
  Container,
  Paper,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
  FilledInput,
  InputAdornment,
} from '@material-ui/core';

import { DropzoneArea } from 'material-ui-dropzone'
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';

import inject from "../helpers/inject";
import AdvertisementsRepository from '../repositories/advertisements-repository';

import NavBar from '../components/shared/nav-bar';

import { grey, deepOrange } from '@material-ui/core/colors'

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: deepOrange[500],
    },
    '& .MuiInput-underline:after': {
      borderBottomColor:  deepOrange[500],
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor:  deepOrange[500],
      },
      '&:hover fieldset': {
        borderColor:  deepOrange[500],
      },
      '&.Mui-focused fieldset': {
        borderColor:  deepOrange[500],
      },
    },
  },
})(TextField);

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['+', /[1-9]/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}

class AdvertisementAddPage extends Component {

  state = { 
    price: 0,
    files: [],
  }

  constructor(props) {
    super(props);

    this.onSaveClick = this.onSaveClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onImagesDropZoneChange = this.onImagesDropZoneChange.bind(this);
  }

  onSaveClick(event){

  };

  handleChange(name) { 
    return event => {
      this.setState({
        ...this.state,
        [name]: event.target.value
      });
    };
  }

  onImagesDropZoneChange(files) {
    this.setState({...this.state, files: files });
  };

  render() {
    const { classes } = this.props;
    const { match: { params: { uid } } } = this.props;
    const { price, files } = this.state;

    return (<Fragment>
      <NavBar>
      </NavBar>
      <Container maxWidth="md" className={classes.root}>
        <Paper className={classes.formContainer}>

          <Box fontFamily="fontFamily">
            <Typography variant="h5">Новое объявление</Typography>
          </Box>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="category">Категория</InputLabel>
            <Select
              id="category"
              value={1}
              className={classes.category}
            >
              <MenuItem value={1}>Категория 1</MenuItem>
              <MenuItem value={2}>Категория 2</MenuItem>
              <MenuItem value={3}>Категория 3</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <CssTextField
              label="Заголовок"
              fullWidth={true}
              className={classes.title}
              margin="normal"
              variant="outlined"
            />
          </FormControl>

          <FormControl className={classes.formControl}>
            <CssTextField
              label="Описание"
              multiline
              rows="6"
              fullWidth={true}
              className={classes.description}
              margin="normal"
              variant="outlined"
            />
          </FormControl>

          <FormControl className={classes.formControl}>
            <DropzoneArea
              dropzoneClass={classes.dropzoneClass}
              onChange={this.onImagesDropZoneChange.bind(this)}
              acceptedFiles={[['image/*']]}
              filesLimit={15}
              maxFileSize={50 * 1024 * 1024} // 50 MB
              dropzoneText="Выберите фотографии"
              showFileNames={true}
              showFileNamesInPreview={true}
              getFileLimitExceedMessage={(filesLimit) => `Максимальное количество фотографий ${filesLimit}`}
              getFileAddedMessage={fileName => `Изображение ${fileName} загружено \n`}
              getFileRemovedMessage={fileName => `Изображение ${fileName} удалено`}
              getDropRejectMessage={(fileName, acceptedFiles, maxFileSize) => `Изображение ${fileName} несоответсвует разрешенным параметрам. Тип: ${acceptedFiles} Максимальный размер: ${maxFileSize / 1024 / 1024} МБ`}
            />
          </FormControl>

          <FormControl className={`${classes.formControl} ${classes.price}`}>
            <InputLabel htmlFor="filled-adornment-amount">Цена</InputLabel>
            <FilledInput
              id="filled-adornment-amount"
              value={price}
              startAdornment={<InputAdornment position="start">₽</InputAdornment>}
              inputComponent={NumberFormatCustom}
              onChange={this.handleChange('price')}
            />
          </FormControl>

          <FormControl className={`${classes.formControl} ${classes.formButtons}`}>
            <Button variant="outlined" color="secondary" onClick={this.onSaveClick}>
              Добавить объявление
            </Button>
          </FormControl>
        </Paper>
      </Container>
    </Fragment>);
  }
}

const useStyles = (theme) => ({
  root: {
    padding: 0,
  },
  formContainer: {
    margin: '5px',
    padding: '10px',
  },
  title: {

  },
  description: {
    'margin-top': 0,
  },
  price: {
    'margin-top': '13px',
    '& .MuiInputLabel-formControl': {
      top: '2px',
      left: '2px',
    },
    '& .MuiInputAdornment-root': {
      'margin-top': '11px',
    },
    '& .MuiFilledInput-input': {
      padding: '20px 0px 10px',
    }
  },
  formControl: {
    margin: theme.spacing(1),
    display: 'block',
  },
  category: {
    'min-width': '220px',
  },
  dropzoneClass: {
    'border-radius': '4px',
    'border-color': theme.palette.secondary.main,

    '& .MuiGrid-container': {
      width: '100%',
      margin: 0,
    },
    '& .MuiGrid-item': {
      padding: '4px'
    },
    '& .MuiFab-root': {
      opacity: 1,
      right: '6px',
    }
  },
  formButtons: {
    'margin-top': '14px',
  }
});

const dependencies = {
  advertisementsRepository: AdvertisementsRepository,
};

export default withStyles(useStyles)(inject(dependencies, AdvertisementAddPage));
