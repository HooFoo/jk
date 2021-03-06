import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';

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
  Theme,
} from '@material-ui/core';

import DropzoneArea from '../../lib/dropzone/dropzone-area';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';

import AdvertisementRepository from '../../repositories/advertisement-repository';
import CategoryRepository from '../../repositories/category-repository';

import { deepOrange } from '@material-ui/core/colors'
import { RouteComponentProps } from 'react-router-dom';
import Category from '../../models/category';
import withDependencies from '../../dependency-injection/with-dependencies';
import { ResolveDependencyProps } from '../../dependency-injection/resolve-dependency-props';
import Advertisement from '../../models/advertisement';

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

function TextMaskCustom(props: any) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['+', /[1-9]/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

function NumberFormatCustom(props: any) {
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

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<any>, ResolveDependencyProps {
}

interface IState {
  id: string,
  title: string,
  description: string,
  price: number,
  currency: string,
  phone: string,
  files: any[],
  initialFiles: string[],
  categories: Category[],
  categoryValue: string,
  isFetching: boolean,
  error?: string,
}

class AdvertisementEditPage extends React.Component<IProps, IState> {
  private сategoryRepository: CategoryRepository;
  private advertisementRepository: AdvertisementRepository;

  constructor(props: IProps) {
    super(props);

    this.сategoryRepository = props.resolve(CategoryRepository);
    this.advertisementRepository = props.resolve(AdvertisementRepository);

    this.state = { 
      id: '',
      title: '',
      description: '',
      price: 0,
      currency: 'RUB',
      phone: '+7',
      files: [],
      initialFiles: [],
      categories: [],
      categoryValue: "",
      isFetching: true,
    };

    this.onSaveClick = this.onSaveClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onImagesDropZoneChange = this.onImagesDropZoneChange.bind(this);
  }

  componentDidMount() {
    let promise = this.fetchCategories();

    let id = this.props.match.params.id;
    if (id) {
      promise = promise.then(() => this.fetchAdvertisement(id));
    }

    promise.then(() => {
      this.setState({...this.state, isFetching: false });
    }).catch(error => {
      console.log(error);
      this.setState({...this.state, error: error, isFetching: false });
    });;
  }

  fetchCategories(): Promise<any> {
    return this.сategoryRepository.index().then(data => {
      this.setState({...this.state, categories: data });
    }).catch(error => {
      console.log(error);
      this.setState({...this.state, error: error });
    });
  }

  fetchAdvertisement(id: string): Promise<any> {
    return this.advertisementRepository.show(this.props.match.params.uid, id).then(data => {
      this.setState({
        ...this.state,
        id: id,
        title: data.title,
        description: data.description,
        categoryValue: data.category,
        phone: data.phone,
        price: data.price,
        currency: data.currency,
        initialFiles: data.files,
      });
    }).catch(error => {
      console.log(error);
      this.setState({...this.state, error: error });
    });
  }

  onSaveClick(event: any){
    const { history, match: { params: { uid } } } = this.props;

    const params = {
      title: this.state.title,
      description: this.state.description,
      phone: this.state.phone,
      files: this.state.files,
      categoryValue: this.state.categoryValue,
    };

    const savePromise = this.state.id
      ? this.advertisementRepository.update(uid, this.state.id, params)
      : this.advertisementRepository.create(uid, params);

    this.setState({
      ...this.state,
      isFetching: true,
    });

    savePromise.then((entity: Advertisement) => {
      return history.push(`/building/${uid}/advertisements/view/${entity.id}`);
    }).catch(error => {
      this.setState({
        ...this.state,
        error: error && error.message ? error.message : "Ошибка сохранения.",
        isFetching: false,
      });
    });
  };

  onDeleteClick(event: any){
    const { history, match: { params: { uid } } } = this.props;

    this.setState({
      ...this.state,
      isFetching: true,
    });

    this.advertisementRepository.delete(uid, this.state.id).then(() => {
      return history.push(`/building/${uid}/advertisements`);
    }).catch(error => {
      this.setState({
        ...this.state,
        error: error && error.message ? error.message : "Ошибка сохранения.",
        isFetching: false,
      });
    });
  }

  handleChange(name:any) {
    return (event: any) => {
      this.setState({
        ...this.state,
        [name]: event.target.value
      });
    };
  }

  onImagesDropZoneChange(files: any) {
    this.setState({...this.state, files: files });
  };

  render() {
    const { classes } = this.props;

    return (<React.Fragment>
      <Container maxWidth="md" className={classes.root}>
        <Paper className={classes.formContainer}>

          <Box fontFamily="fontFamily">
            <Typography variant="h5">{this.state.id ? 'Редактирование' : 'Новое объявление'}</Typography>
          </Box>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="category">Категория</InputLabel>
            <Select
              id="category"
              className={classes.category}
              value={this.state.categoryValue}
              onChange={this.handleChange('categoryValue')}
            >
              {this.state.categories.map((x, index) => (
                <MenuItem key={index} value={x.id}>{x.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <CssTextField
              id="title"
              label="Заголовок"
              fullWidth={true}
              className={classes.title}
              value={this.state.title}
              onChange={this.handleChange('title')}
              margin="normal"
              variant="outlined"
            />
          </FormControl>

          <FormControl className={classes.formControl}>
            <CssTextField
              id="description"
              label="Описание"
              multiline
              rows="6"
              fullWidth={true}
              className={classes.description}
              value={this.state.description}
              onChange={this.handleChange('description')}
              margin="normal"
              variant="outlined"
            />
          </FormControl>

          <FormControl className={classes.formControl}>
            <DropzoneArea
              dropzoneClass={classes.dropzoneClass}
              onChange={this.onImagesDropZoneChange.bind(this)}
              acceptedFiles={['image/*']}
              filesLimit={15}
              maxFileSize={50 * 1024 * 1024} // 50 MB
              dropzoneText="Выберите фотографии"
              showPreviews={false}
              showPreviewsInDropzone={true}
              showFileNames={true}
              showFileNamesInPreview={true}
              initialFiles={this.state.initialFiles}
              getFileLimitExceedMessage={(filesLimit: number) => `Максимальное количество фотографий ${filesLimit}`}
              getFileAddedMessage={(fileName: string) => `Изображение ${fileName} загружено \n`}
              getFileRemovedMessage={(fileName: string) => `Изображение ${fileName} удалено`}
              getDropRejectMessage={(fileName: any, acceptedFiles: string[], maxFileSize: number) => `Изображение ${fileName} несоответсвует разрешенным параметрам. Тип: ${acceptedFiles} Максимальный размер: ${maxFileSize / 1024 / 1024} МБ`}
            />
          </FormControl>

          <FormControl className={`${classes.formControl} ${classes.price}`}>
            <InputLabel htmlFor="filled-adornment-price">Цена</InputLabel>
            <FilledInput
              id="filled-adornment-price"
              value={this.state.price}
              startAdornment={<InputAdornment position="start">{this.state.currency.getCurrencySymbol()}</InputAdornment>}
              inputComponent={NumberFormatCustom}
              onChange={this.handleChange('price')}
            />
          </FormControl>

          <FormControl className={`${classes.formControl} ${classes.phone}`}>
            <InputLabel htmlFor="filled-adornment-phone">Телефон для связи</InputLabel>
            <FilledInput
              id="filled-adornment-phone"
              value={this.state.phone}
              inputComponent={TextMaskCustom}
              onChange={this.handleChange('phone')}
            />
          </FormControl>

          <FormControl className={`${classes.formControl} ${classes.formButtons}`}>
            <Button variant="outlined" color="secondary" onClick={this.onSaveClick} disabled={this.state.isFetching}>
              {this.state.id ? 'Сохранить' : 'Добавить объявление'}
            </Button>

            {this.state.id &&
              <Button className={classes.deleteButton} variant="outlined" onClick={this.onDeleteClick} disabled={this.state.isFetching}>
                Удалить
              </Button>
            }

          </FormControl>
        </Paper>
      </Container>
    </React.Fragment>);
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    padding: 0,
  },
  formContainer: {
    height: 'calc(100vh - 91px)',
    overflow: 'auto',
    'margin-top': '10px',
    padding: '10px',
  },
  title: {
    'margin-top': '8px',
  },
  description: {
    'margin-top': 0,
  },
  price: {
    'margin-top': '13px !important',
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
  phone: {
    '& .MuiInputLabel-formControl': {
      top: '2px',
      left: '2px',
    },
    '& .MuiFilledInput-input': {
      width: '201px',
      padding: '20px 0px 10px 12px',
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
    marginTop: '14px',
  },
  deleteButton: {
    marginLeft: theme.spacing(2),
  }
});

export default withStyles(styles)(withDependencies(AdvertisementEditPage));
