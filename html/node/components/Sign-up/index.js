import {
    Container,
    Avatar,
} from '@material-ui/core'
import HttpsIcon from '@material-ui/icons/Https';
import {
    TextField,
    Button,
    Grid,
    Checkbox,
    FormControlLabel,
    Hidden
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: "center",
        flexDirection: 'column'
    },
    
  });
  const SignInStyles = styled.div`
  display: flex !important;
  justify-content: center !important;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 3rem;
  .form-wraper {
    width: 100%;
    max-width: 450px;
  }
  .top-sign-in {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .MuiFormControl-root {
      width: 100%;
    }
  }
`;
export default function SignUp() {
    const classes = useStyles()
    return (
        <>
            <Container style={{ marginTop: '10vh'}}>
                <SignInStyles>
                    <div className='top-sign-in' style={{ marginBottom: '20px' }}>
                        <Avatar style={{background: 'red'}}>
                            <HttpsIcon/>
                        </Avatar>
                        <h5>Đăng Ký</h5>
                    </div>
                    <div className='form-wraper'>
                        <form className='top-sign-in'>
                        <Hidden smDown>
                        <Grid container justify='space-between'>
                            <Grid item lg={5.5} >
                            <TextField style={{ marginBottom: '20px' }} id="outlined-basic " label="Họ" variant="outlined" />
                            </Grid>
                            <Grid item lg={5.5}>
                            <TextField style={{ marginBottom: '20px' }} id="outlined-basic " label="Tên" variant="outlined" />
                            </Grid>
                        </Grid>
                        </Hidden>
                        <Hidden smUp>
                        <TextField style={{ marginBottom: '20px' }} id="outlined-basic " label="Họ" variant="outlined" />
                        <TextField style={{ marginBottom: '20px' }} id="outlined-basic " label="Tên" variant="outlined" />
                        </Hidden>
                        <TextField style={{ marginBottom: '20px' }} id="outlined-basic " label="Email" variant="outlined" />
                        <TextField style={{ marginBottom: '20px' }} id="outlined-basic" label="Mật khẩu" variant="outlined" />
                        <FormControlLabel control={<Checkbox />} label="Đăng ký nhận email khuyến mãi từ chúng tôi"/>
                        <Button style={{width:'100%',background: '#3B8AD9', color: 'white'}}>Đăng ký</Button>
                        </form>
                    </div>
                </SignInStyles>
            </Container>
        </>
    )
}
