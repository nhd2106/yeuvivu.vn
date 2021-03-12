import ReactLoading from 'react-loading';

import Backdrop from '@material-ui/core/Backdrop';

export default function Loader({ color, type }) {
    return (
        <Backdrop style={{ zIndex: 99999999999 }} open>
          <ReactLoading type={type} color={color} height={'5%'} width={'5%'} />
        </Backdrop>
      );
}