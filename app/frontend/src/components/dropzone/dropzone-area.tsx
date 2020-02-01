import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import * as React from 'react';
import Dropzone from 'react-dropzone';
import PreviewList from './preview-list';
import SnackbarContentWrapper from './snackbar-content-wrapper';
import { ChipProps } from '@material-ui/core/Chip';
import { withDefaultProps } from '../../helpers/with-default-props';
import { WithStyles } from '@material-ui/styles';
import { convertBytesToMbsOrKbs } from '../../helpers/file-size-helper';

type DropzoneAreaProps = {
    acceptedFiles?: string[];
    filesLimit?: number;
    maxFileSize?: number;
    dropzoneText?: string;
    showPreviews?: boolean;
    showPreviewsInDropzone?: boolean;
    showFileNamesInPreview?: boolean;
    showFileNames?: boolean;
    useChipsForPreview?: boolean;
    previewChipProps?: ChipProps;
    showAlerts?: boolean;
    clearOnUnmount?: boolean;
    dropzoneClass?: string;
    dropzoneParagraphClass?: string;
    initialFiles?: string[];
    onChange?: (files: any[]) => void;
    onDrop?: (files: any[]) => void;
    onDropRejected?: (files: any[], evt: any) => void;
    onDelete?: (file: any[]) => void;
    getFileLimitExceedMessage?: (filesLimit: number) => string;
    getFileAddedMessage?: (fileName: string) => string;
    getFileRemovedMessage?: (fileName: string) => string;
    getDropRejectMessage?: (
        rejectedFile: { name: string; type: string | undefined; size: number },
        acceptedFiles: string[],
        maxFileSize: number
    ) => string;
} & DefaultProps & WithStyles<typeof styles>;

type DefaultProps = Readonly<typeof defaultProps>;
const defaultProps = {
    acceptedFiles: ['image/*', 'video/*', 'application/*'],
    filesLimit: 3,
    maxFileSize: 3000000,
    dropzoneText: 'Drag and drop an image file here or click',
    showPreviews: false, // By default previews show up under in the dialog and inside in the standalone
    showPreviewsInDropzone: true,
    showFileNamesInPreview: false,
    previewChipProps: {},
    showAlerts: true,
    clearOnUnmount: true,
    initialFiles: [],
    getFileLimitExceedMessage: (filesLimit: number) => (`Maximum allowed number of files exceeded. Only ${filesLimit} allowed`),
    getFileAddedMessage: (fileName: string) => (`File ${fileName} successfully added.`),
    getFileRemovedMessage: (fileName: string) => (`File ${fileName} removed.`),
    getDropRejectMessage: (
            rejectedFile: { name: string; type: string | undefined; size: number },
            acceptedFiles: string[],
            maxFileSize: number
        ) => {
        let message = `File ${rejectedFile.name} was rejected. `;
        if (!acceptedFiles.includes(rejectedFile.type || "")) {
            message += 'File type not supported. '
        }
        if (rejectedFile.size > maxFileSize) {
            message += 'File is too big. Size limit is ' + convertBytesToMbsOrKbs(maxFileSize) + '. ';
        }
        return message;
    },
    onChange: (files: any[]) => { },
    onDrop: (files: any[]) => { },
    onDropRejected: (files: any[], evt: any) => { },
    onDelete: (file: any[]) => { }
};

class DropzoneArea extends React.Component<DropzoneAreaProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            fileObjects: [],
            openSnackBar: false,
            snackbarMessage: '',
            snackbarVariant: 'success',
            dropzoneText: props.dropzoneText
        }
    }
    async filesArray(urls: any[]) {
        try {
            for (const url of urls) {
                const file = await this.createFileFromUrl(url);
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    this.setState({
                        fileObjects: this.state.fileObjects.concat({ file: file, data: event.target.result })
                    }, () => {
                        if (this.props.onChange) {
                            this.props.onChange(this.state.fileObjects.map((fileObject: any) => fileObject.file));
                        }
                    });
                };
                reader.readAsDataURL(file);
            }
        } catch (e) {
            console.log(e)
        }
    }
    componentWillUnmount() {
        if (this.props.clearOnUnmount) {
            this.setState({
                fileObjects: []
            })
        }
    }
    componentDidUpdate(prevProps: any) {
        if (this.props.dropzoneText !== prevProps.dropzoneText) {
            this.setState({
                dropzoneText: this.props.dropzoneText
            });
        }
        if (this.props.initialFiles !== prevProps.initialFiles) {
            this.filesArray(this.props.initialFiles || []);
        }
    }
    onDrop(files: any[]) {
        const _this = this;
        if (this.props.filesLimit && this.props.filesLimit > 1 && this.state.fileObjects.length + files.length > this.props.filesLimit) {
            this.setState({
                openSnackBar: true,
                snackbarMessage: this.props.getFileLimitExceedMessage(this.props.filesLimit),
                snackbarVariant: 'error'
            });
        } else {
            var count = 0;
            var message = '';
            if(!Array.isArray(files)) files = [files];

            files.forEach((file) => {
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    _this.setState({
                        fileObjects: this.props.filesLimit <= 1 ? [{ file: file, data: event.target.result }] : _this.state.fileObjects.concat({ file: file, data: event.target.result })
                    }, () => {
                        if (this.props.onChange) {
                            this.props.onChange(_this.state.fileObjects.map((fileObject: any) => fileObject.file));
                        }
                        if (this.props.onDrop) {
                            this.props.onDrop(file)
                        }
                        message += this.props.getFileAddedMessage(file.name);
                        count++; // we cannot rely on the index because this is asynchronous
                        if (count === files.length) {
                            // display message when the last one fires
                            this.setState({
                                openSnackBar: true,
                                snackbarMessage: message,
                                snackbarVariant: 'success'
                            });
                        }
                    });
                };
                reader.readAsDataURL(file);
            })
        }
    }
    handleRemove = (fileIndex: any) => (event: any) => {
        event.stopPropagation();
        const { fileObjects } = this.state;
        const file = fileObjects.filter((fileObject: any, i: number) => { return i === fileIndex })[0].file;
        fileObjects.splice(fileIndex, 1);
        this.setState(fileObjects, () => {
            if (this.props.onDelete) {
                this.props.onDelete(file);
            }
            if (this.props.onChange) {
                this.props.onChange(this.state.fileObjects.map((fileObject: any) => fileObject.file));
            }
            this.setState({
                openSnackBar: true,
                snackbarMessage: this.props.getFileRemovedMessage(file.name),
                snackbarVariant: 'info'
            });
        });
    };
    handleDropRejected(rejectedFiles: any[], evt: any) {
        var message = '';
        rejectedFiles.forEach((rejectedFile: any) => {
            message = this.props.getDropRejectMessage(
                rejectedFile,
                this.props.acceptedFiles,
                this.props.maxFileSize
            );
        });
        if (this.props.onDropRejected) {
            this.props.onDropRejected(rejectedFiles, evt);
        }
        this.setState({
            openSnackBar: true,
            snackbarMessage: message,
            snackbarVariant: 'error'
        });
    }
    onCloseSnackbar = () => {
        this.setState({
            openSnackBar: false,
        });
    };

    async createFileFromUrl(url: string) {
        const response = await fetch(url);
        const data = await response.blob();
        const metadata = { type: data.type };
        const ext = data.type.split('/').pop() || "ext";
        const filename = url.replace(/\?.+/, '').split('/').pop() || `file.${ext}`;
        return new File([data], filename, metadata);
    }

    render() {
        const { classes } = this.props;
        const showPreviews = this.props.showPreviews && this.state.fileObjects.length > 0;
        const showPreviewsInDropzone = this.props.showPreviewsInDropzone && this.state.fileObjects.length > 0;
        return (
            <React.Fragment>
                <Dropzone
                    accept={this.props.acceptedFiles.join(',')}
                    onDrop={this.onDrop.bind(this)}
                    onDropRejected={this.handleDropRejected.bind(this)}
                    className={`${this.props.dropzoneClass} ${classes.dropZone}`}
                    acceptClassName={classes.stripes}
                    rejectClassName={classes.rejectStripes}
                    maxSize={this.props.maxFileSize}
                    multiple={this.props.filesLimit > 1}
                >
                    <div className={classes.dropzoneTextStyle}>
                        <p className={`${classes.dropzoneParagraph} ${this.props.dropzoneParagraphClass}`}>
                            {this.state.dropzoneText}
                        </p>
                        <CloudUploadIcon className={classes.uploadIconSize} />
                    </div>
                    {showPreviewsInDropzone &&
                        <PreviewList
                            fileObjects={this.state.fileObjects}
                            handleRemove={this.handleRemove.bind(this)}
                            showFileNames={this.props.showFileNames}
                            useChipsForPreview={this.props.useChipsForPreview}
                            previewChipProps={this.props.previewChipProps}
                        />
                    }
                </Dropzone>
                {showPreviews &&
                    <React.Fragment>
                        <Grid container>
                            <span>Preview:</span>
                        </Grid>
                        <PreviewList
                            fileObjects={this.state.fileObjects}
                            handleRemove={this.handleRemove.bind(this)}
                            showFileNames={this.props.showFileNamesInPreview}
                            useChipsForPreview={this.props.useChipsForPreview}
                            previewChipProps={this.props.previewChipProps}
                        />
                    </React.Fragment>
                }
                {this.props.showAlerts &&
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.openSnackBar}
                        autoHideDuration={6000}
                        onClose={this.onCloseSnackbar}
                    >
                        <SnackbarContentWrapper
                            onClose={this.onCloseSnackbar}
                            variant={this.state.snackbarVariant}
                            message={this.state.snackbarMessage}
                        />
                    </Snackbar>
                }
            </React.Fragment>
        )
    }
}

const styles = (theme: Theme) => createStyles({
    '@keyframes progress': {
        '0%': {
            backgroundPosition: '0 0',
        },
        '100%': {
            backgroundPosition: '-70px 0',
        },
    },
    dropZone: {
        position: 'relative',
        width: '100%',
        minHeight: '250px',
        backgroundColor: '#F0F0F0',
        border: 'dashed',
        borderColor: '#C8C8C8',
        cursor: 'pointer',
        boxSizing: 'border-box',
    },
    stripes: {
        border: 'solid',
        backgroundImage: 'repeating-linear-gradient(-45deg, #F0F0F0, #F0F0F0 25px, #C8C8C8 25px, #C8C8C8 50px)',
        animation: 'progress 2s linear infinite !important',
        backgroundSize: '150% 100%',
    },
    rejectStripes: {
        border: 'solid',
        backgroundImage: 'repeating-linear-gradient(-45deg, #fc8785, #fc8785 25px, #f4231f 25px, #f4231f 50px)',
        animation: 'progress 2s linear infinite !important',
        backgroundSize: '150% 100%',
    },
    dropzoneTextStyle: {
        textAlign: 'center'
    },
    uploadIconSize: {
        width: 51,
        height: 51,
        color: '#909090'
    },
    dropzoneParagraph: {
        fontSize: 24
    }
});

export default withStyles(styles)(withDefaultProps(defaultProps, DropzoneArea));
