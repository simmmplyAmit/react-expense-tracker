import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    makeStyles,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import DataProvider from "../DataProvider";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
    drawer: {
        width: "50%",
    },
});

function Header({ history }) {
    const classes = useStyles();
    const [state, setState] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState(open);
    };

    const list = () => (
        <div
            style={{ marginTop: 60 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List component="nav" aria-label="main mailbox folders">
                <Link to="/">
                    <ListItem button>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
                <Link to="/login">
                    <ListItem button>
                        {/* <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon> */}
                        <ListItemText primary="Login" />
                    </ListItem>
                </Link>
                <ListItem button>
                    {/* <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon> */}
                    <ListItemText primary="Register" />
                </ListItem>
                <Link to="/logout">
                    <ListItem button>
                        <ListItemText
                            primary="Logout"
                            onClick={async () => {
                                let response = await DataProvider.logout();
                                console.log("logged out ", response);
                                history.push("/");
                            }}
                        />
                    </ListItem>
                </Link>
            </List>
        </div>
    );

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={toggleDrawer(true)}
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor={"left"}
                        open={state}
                        onClose={toggleDrawer(false)}
                        classes={{ paper: classes.drawer }}
                    >
                        {list()}
                    </Drawer>
                    <Typography variant="h6" color="inherit">
                        Expense Tracker
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(Header);
