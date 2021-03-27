import { useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import { makeStyles, fade } from "@material-ui/core/styles";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import DDrawer from "./Drawer";
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    border: '1px solid #CEC4BD',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
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
                  { title: "Review", slug: "/review" },
                  { title: "Giảm giá", slug: "/giam-gia" },
                ].map(({ title, slug }) => {
                  return (
                    <Hidden smDown key={slug}>
                      <Link href={`${slug}`}>
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
            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Tìm kiếm…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={(e)=> {
                if(e.key === 'Enter') 
                console.log(e.target.value)
              }}
            />
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
