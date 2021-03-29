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
import Facebook from '@material-ui/icons/Facebook';
import Instagram from '@material-ui/icons/Instagram';
import Phone from '@material-ui/icons/Phone';
import InputBase from '@material-ui/core/InputBase';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  contactButton: {
    marginRight: `${theme.spacing(1)}`,
    marginLeft: `${theme.spacing(2)}!important`,
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
    marginRight: 16,
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

export default function DNavbar({ linksAndPhone }) {
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
      <AppBar position="sticky" style={{
        display: "flex",
        background: 'white',
        justifyContent: 'center'
      }}>
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
          <div className="desktopNavigations"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignSelf: 'center'
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter')
                    router.push(`/timkiem?key=${e.target.value}`)
                }}
              />
            </div>
            <Hidden className="header-contacts" smDown>
            <a href={`tel:0${linksAndPhone?.phone}`}>
            <IconButton
              edge="start"
              className={classes.contactButton}
              aria-label="menu"
              size="small"
            >
              <Phone />
            </IconButton>
            </a>
            <IconButton
              onClick={() => window.open(`${linksAndPhone?.facebook ?? ""}`)}
              edge="start"
              className={classes.contactButton}
              color="primary"
              aria-label="menu"
              size="small"
            >
              <Facebook />
            </IconButton>
            <IconButton
              onClick={() => window.open(`${linksAndPhone?.instagram ?? ""}`)}
              edge="start"
              className={classes.contactButton}
              aria-label="menu"
              size="small"
            >
              <Instagram />
            </IconButton>
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <DDrawer
        open={open}
        toggleDrawer={toggleDrawer}
      />
    </>
  );
}
