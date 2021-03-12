import {
    Container,
    Avatar,
} from '@material-ui/core'
import HttpsIcon from '@material-ui/icons/Https';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
    TextField,
    Button,
    Grid,
    Checkbox,
    FormControlLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

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

import { signInHandler } from '../../redux/actions/user';
import { useDispatch } from 'react-redux';
import { set } from 'lodash';



const useStyles = makeStyles({
    root: {
        display: 'flex',
      justifyContent: "center",
      flexDirection: 'column'
    },
    
  });

export default function SignIn() {
    const router = useRouter();
    const [user, setUser ] = useState(null);
    const dispatch = useDispatch();
    const handleSignIn =  (mode) => {
          const SignInSucess = () => {
            router.push('/admin')
          }
         dispatch(signInHandler(user, SignInSucess));
    }
    const handleChange = (e) => {
      const { name, value } = e.target
      setUser((prev) => ({
        ...prev,
        [name]: value
      }))
    }
    return (
        <>
            <Container style={{ marginTop: '10vh'}}>
                <SignInStyles>
                    <div className='top-sign-in' style={{ marginBottom: '20px' }}>
                        <Avatar style={{background: 'red'}}>
                            <HttpsIcon/>
                        </Avatar>
                        <h5>Đăng nhập</h5>
                    </div>
                    <div className='form-wraper'>
                        <form className='top-sign-in' onChange={(e) => { 
                          handleChange(e)
                        }}>
                        <TextField  style={{ marginBottom: '20px' }} id="user" name="identifier" label="Tên người dùng" variant="outlined" />
                        <TextField style={{ marginBottom: '20px' }} id="password" name="password" type="password" label="Mật khẩu" variant="outlined" />
                        <FormControlLabel control={<Checkbox />} label="Ghi nhớ đăng nhập"/>
                        <Button onClick={() => handleSignIn()} on style={{width:'100%',background: '#3B8AD9', color: 'white', marginBottom: '1rem'}}>Đăng nhập</Button>
                        <Button onClick={() => handleSignIn()} style={{width:'100%',background: 'red', color: 'white'}}>Đăng nhập với google</Button>
                        </form>
                    </div>
                </SignInStyles>
                
                
            </Container>
        </>
    )
}
