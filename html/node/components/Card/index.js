import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Facebook";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { FacebookShareButton, FacebookIcon, FacebookMessengerShareButton, FacebookMessengerIcon } from "react-share";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin:'1rem 2rem'
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function MediaCard({ image, title, description, slug }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link href="/trai-nghiem/[slug]" as={`trai-nghiem/${slug}`}>
        <a>
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={title}
            subheader="September 14, 2016"
          />
          <CardMedia
            className={classes.media}
            image={image}
            title="Paella dish"
          />
          <CardContent>
            <Typography

              variant="body2"
              color="textSecondary"
              component="p"
              noWrap
            >
              {description}
            </Typography>
          </CardContent>
        </a>
      </Link>
      <CardActions disableSpacing className="card-actions">
        <FacebookShareButton
          url="https://reactjsexample.com/tag/popup/"
          quote={title}
          className="Demo__some-network__share-button"
        >
          <FacebookIcon  size={32} round />
        </FacebookShareButton>
        <FacebookMessengerShareButton
          url="https://reactjsexample.com"
          quote={title}
          className="Demo__some-network__share-button"
        >
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
      </CardActions>
    </Card>
  );
}
