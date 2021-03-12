import * as Loaders from 'react-loadingg';

import Backdrop from '@material-ui/core/Backdrop';

export default function Waiting({ fullscreen, type, ...rest }) {
  const Loader = Loaders[type] || Loaders.BlockLoading;
  const props = { ...rest };
  if (!props.color) {
    props.color = fullscreen ? '#4db6ac' : '#004d40';
  }
  const Comp = <Loader {...props} />;
  if (fullscreen) {
    return (
      <Backdrop style={{ zIndex: 99999999999 }} open>
        {Comp}
      </Backdrop>
    );
  }
  return Comp;
}