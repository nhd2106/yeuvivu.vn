import React from 'react';
import Link from 'next/link';

import styled from 'styled-components';
import {
    Button
} from '@material-ui/core';

import { numberFormatter } from '../../libs/utils';
import { BACKEND } from '../../libs/config';

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    border-radius: 4px;
    padding: 1rem;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
    min-height: 200px;
    &:hover {
        // box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1), 0px 20px 20px rgba(0, 0, 0, 0.1);
        transform: scale(1.02);
        box-shadow: 0 0 0 2px #1BA0E2;
        transition: 0.5s;

    }
    h3 {
        font-size: 1vw - 0.5rem;
    }
    .hotel_content {
        display: flex;
    }
    .content_left {
        padding: 0 1rem;
    }
    .content_right {
        padding: 0 1rem;
        border-left: 1px dashed #d9d9d9;
    }
    background-color: white;
    
    .number {
        display: flex;
        justify-content: space-between;
        .count, .price {
            flex: 1 1 50%;
        }
        .price {
            text-align: right;
        }
        .old-price {
            text-decoration: line-through;
        }
        .new-price {
            color: red;
            text-align: right;
        }
    }
   

@media (min-width: 1200px) {
    .hotel_content{
        position: relative;
    }
    .rating {
        position: absolute;
        right: 0;
        top: 0;
    }
    .hotel_image {
        width: 225px;
    }
    .hotel_content, .content_left{
        width: calc(100% - 225px);
        width: -webkit-calc(100% - 225px);
    }
    .content_right{
        width: 225px;
    }
}
@media (max-width: 1199px) {
    .hotel_content {
        flex-direction: column;
    }
}
@media (min-width: 768px) and (max-width: 1199px) {
    .hotel_content{
        position: relative;
    }
    .hotel_image {
        width: 150px;
    }
    .hotel_content {
        width: calc(100% - 150px);
        width: -webkit-calc(100% - 150px);
    }
}
@media (max-width: 967px) {
    .hotel_image {
        width: 120px;
    }
    .hotel_content {
        width: calc(100% - 120px);
        width: -webkit-calc(100% - 150px);
    }
}

`

const HotelItem = ({ title, price, urlImage, slug }) => {

    return (
        <div style={{
            marginTop: '1rem',
            marginBottom: '1rem',
            minHeight: '200px',
        }}>
            <Link href="/hotels/[slug]" as={`hotels/${slug}`} >
                <a>
                    <Wrapper>
                        <div className='hotel_image'>
                            <img src={urlImage} width="100%" height="100%" />
                        </div>
                        <div className='hotel_content'>
                            <div className="content_left">
                                <h3>
                                    {title}
                                    
                                </h3>
                                <div>địa chỉ</div>
                                <div className='rating'>đánh giá</div>
                                <div>cơ sở vật chất</div>
                            </div>
                            <div className="content_right">
                               <div>{numberFormatter.format(price)}</div>
                               <Button color='primary' variant='outlined'>xem phòng</Button>
                            </div>

                        </div>
                    </Wrapper>
                </a>

            </Link>
        </div>
    )
}

export default HotelItem;