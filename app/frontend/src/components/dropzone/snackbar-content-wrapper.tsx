import * as React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

type Dictionary = { [index: string]: (props: SvgIconProps) => JSX.Element }
const variantIcon: Dictionary = {
  "success": CheckCircleIcon,
  "warning": WarningIcon,
  "error": ErrorIcon,
  "info": InfoIcon,
};

type Props = {
  onClose: () => void,
  variant: any,
  message: string,
  className?: string
} & WithStyles<typeof styles>;

const SnackbarContentWrapper: React.FC<Props> = (props: Props) => {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant as string];
  const variantClass = (classes as any)[variant];

  return (
    <SnackbarContent
      className={`${variantClass} ${className}`}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={`${classes.icon} ${classes.iconVariant}`} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

const styles = (theme: Theme) => createStyles({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  close: {

  }
});

export default withStyles(styles)(SnackbarContentWrapper);
