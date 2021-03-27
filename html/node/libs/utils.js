export const numberFormatter = new Intl.NumberFormat("vn-VI", {
  maximumFractionDigits: 3,
});

export const getDate = (isoDate) => {
  const date = new Date(isoDate);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return `${dt}/${month}/${year}`;
};
