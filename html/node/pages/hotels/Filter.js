import React, { useState } from "react";
import styled from "styled-components";

import clsx from "clsx";
import {
  Drawer,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Dialog as MDialog,
  DialogTitle,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  DialogContent,
  Slide,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {
  ExpandMore as ExpandMoreIcon,
  FavoriteBorder,
  Favorite,
  Restore as RestoreIcon,
  LocationOn,
  Close as CloseIcon,
} from "@material-ui/icons";

import { numberFormatter } from "../../libs/utils";

const Dialog = styled(MDialog)`
  .MuiPaper-root {
    width: 100%;
    height: 100%;
  }
  .MuiDialog-paper {
    margin: 0;
  }
  .MuiDialog-paperScrollPaper {
    max-height: unset;
  }
  .apply-button {
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const useStyles = makeStyles({
  list: {
    width: "100%",
  },
  fullList: {
    width: "auto",
  },
  aTag: {
    color: "white",
    textDecoration: "none",
  },
  paperAnchorLeft: {
    background: "#1BA0E2",
  },
  active: {
    color: "yellow",
  },
});

const Filter = ({ open, toggleDrawer, handlePrices, handleCloseDialog }) => {
  const classes = useStyles();

  const [prices, setPrices] = useState([0, 100000000]);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const list = () => (
    <div className={clsx(classes.list)} role="presentation">
      <h4>Tìm kiếm khách sạn</h4>
      <form noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Bạn muốn đi đâu?"
          style={{
            width: "100%",
          }}
        />
      </form>
      <div className={classes.AccordionWrapper}>
        <div>
          <div aria-controls="cities" id="cities">
            <Typography className={classes.heading}>Top điểm đến</Typography>
          </div>
          <div>
            <FormGroup column>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                }
                label="Phú Quốc"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                }
                label="Đà Lạt"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                }
                label="Nha Trang"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                }
                label="Hội An"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                }
                label="Vũng Tàu"
              />
            </FormGroup>
          </div>
        </div>
        <div>
          <div aria-controls="hotelTypes" id="hotelTypes">
            <Typography className={classes.heading}>Loại khách sạn</Typography>
          </div>
          <div>
            <FormGroup column>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                }
                label="Resorts"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                }
                label="Căn hộ"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                }
                label="Villa"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                }
                label="Biệt thự"
              />
            </FormGroup>
          </div>
        </div>
        <div>
          <div aria-controls="prices" id="prices">
            <Typography className={classes.heading}>khoảng giá</Typography>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                style={{
                  wordWrap: "break-word",
                }}
              >
                từ {numberFormatter.format(prices[0])}
              </Typography>
              <Typography
                style={{
                  wordWrap: "break-word",
                }}
              >
                đến {numberFormatter.format(prices[1])} vnđ
              </Typography>
              <Slider
                value={prices}
                onChange={handlePrices}
                aria-labelledby="range-slider"
                // getAriaValueText={valuetext}
                min={0}
                max={10000000}
              />
            </div>
          </div>
        </div>
        <div>
          <div aria-controls="meals" id="meals">
            <Typography className={classes.heading}>Bao gồm bữa ăn</Typography>
          </div>
          <div>
            <FormGroup column>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                }
                label="Buffet sáng"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                }
                label="Buffet tối"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                }
                label="Bữa trưa"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                }
                label="Tất cả bữa ăn"
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        // TransitionComponent={Transition}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle onClose={handleCloseDialog} id="customized-dialog-title">
          Bộ lọc
        <Button edge="start" color="inherit" onClick={handleCloseDialog} aria-label="close" className="apply-button">
              Áp dụng
          </Button>
        </DialogTitle>
        <DialogContent dividers>
        {list()}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Filter;
