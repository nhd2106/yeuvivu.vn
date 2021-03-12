import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import MailIcon from '@material-ui/icons/Mail';
import Link from 'next/link';
import HotelIcon from '@material-ui/icons/Hotel';
import Icon from '@material-ui/core/Icon';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  aTag: {
      color: 'black',
      textDecoration: 'none',
  },
  paperAnchorLeft : {
    background: 'white',
  },
  active: {
    color: 'yellow',
  }
});

export default function DDrawer({ open, toggleDrawer, navigations }) {
  const classes = useStyles();
  const router = useRouter();
  const currentSlug = router.asPath;
  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
      <ListItem >
            <ListItemIcon></ListItemIcon>
            <Link href="/">
                  <a style={{color: 'black'}}><h4>Yêu vivu</h4></a>
                </Link>
          </ListItem>
      {[{ title: "Điểm đến", slug: "/diem-den", icon: "location_on" },
                  { title: "Ẩm thực", slug: "/am-thuc", icon: "ramen_dining" },
                  { title: "Lịch trình", slug: "/lich-trinh", icon: "date_range" },
                  { title: "Review", slug: "/review", icon: "rate_review" },
                  { title: "Giảm giá", slug: "/giam-gia", icon: "sell" },
      ].map(({ title, slug, icon }, index) => (
          <ListItem button key={slug}>
            <Icon style={{color: 'black', marginRight: '1rem'}}>{icon}</Icon>
            <Link  href='/[Trang]' as={`${slug}`}>
                  <a className={clsx(classes.aTag, currentSlug===`/${slug}`? classes.active: '')}>{title}</a>
                </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {(
        <>
          <Drawer
            anchor={'left'}
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            classes={{
              paperAnchorLeft: classes.paperAnchorLeft
            }}
            // transitionDuration={{enter: 1.5, exit: 1.5}}
          >
            {list()}
          </Drawer>
        </>
      )}
    </div>
  );
}
