import { useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import Container from "@material-ui/core/Container";
import DDrawer from "./Drawer";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { signOutHandler } from "../../redux/actions/user";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import { Badge } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBackground: {
    background: "#1BA0E2",
  },
  linkMargin: {
    marginRight: "20px",
    display: "inline-block",
    color: "black",
    textDecoration: "none",
  },
  list: {
    width: 250,
  },
}));

export default function DNavbar({ navigations }) {
  const router = useRouter();
  const currentSlug = router.asPath;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRouter = (link) => {
    router.push(link);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user.user);
  const signOut = () => {
    window.localStorage.clear();
    googleAuth.signOut();
    dispatch(signOutHandler());
    handleClose();
  };

  return (
    <>
      <AppBar position="sticky" style={{ background: "white" }}>
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              onClick={toggleDrawer(true)}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <div className="container"
            style={{
              display: "flex",
              // justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div
              style={{
                // flex: " 1 1 40rem",
                display: "flex",
                alignItems: "center",
                marginRight: 'calc(2rem + 1vw)'
              }}
            >
              <Link href="/">
                <a
                  style={{
                    textDecoration: "none",
                    fontSize: "calc(0.7rem + 1vw)",
                  }}
                >
                  <h4>Yêu vivu</h4>
                </a>
              </Link>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            {[
                  { title: "Điểm đến", slug: "/diem-den" },
                  { title: "Ẩm thực", slug: "/am-thuc" },
                  { title: "Lịch trình", slug: "/lich-trinh" },
                  { title: "Riview", slug: "/review" },
                  { title: "Giảm giá", slug: "/giam-gia" },
                ].map(({ title, slug }) => {
                  return (
                    <Hidden smDown key={slug}>
                      <Link href='/[Trang]' as={`${slug}`}>
                        <a
                          className={clsx(`${classes.linkMargin} `, {
                            active: currentSlug === `/${slug}`,
                          })}
                        >
                          {title}
                        </a>
                      </Link>
                    </Hidden>
                  );
                })}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <DDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        navigations={navigations}
      />
    </>
  );
}
