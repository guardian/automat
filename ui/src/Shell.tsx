import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import clsx from 'clsx';
import { css } from 'emotion';
import { StylesProvider } from '@material-ui/core/styles';
import { makeStyles, CssBaseline } from '@material-ui/core';
import { Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, Container, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, ViewQuilt as ViewQuiltIcon } from '@material-ui/icons';

// TODO
// Refactor styling to use JSS/Emotion for consistency
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const logoWrapperStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const automatLogoStyles = css`
  height: 35px;
`;

const guLogoStyles = css`
  height: 35px;
  margin-left: 12px;
`;

const sidebarLinkStyles = css`
  width: 100%;
  display: block;
  text-decoration: none;
  color: inherit;
`;

type Props = {
  children: JSX.Element;
};

export const Shell = ({ children }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <Router>
      <StylesProvider injectFirst>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpen(true)}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                <Link to="/" className={logoWrapperStyles}>
                  <img src="/automat-logo.png" alt="Automat logo" className={automatLogoStyles} />
                </Link>
              </Typography>
              <img src="/guardian-logo.png" alt="The Guardian logo" className={guLogoStyles} />
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={() => setOpen(false)}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              <Link to="/" className={sidebarLinkStyles}>
                <ListItem button>
                  <ListItemIcon>
                    <ViewQuiltIcon />
                  </ListItemIcon>

                  <ListItemText primary="Slots" />
                </ListItem>
              </Link>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              {children}
            </Container>
          </main>
        </div>
      </StylesProvider>
    </Router>
  );
};
