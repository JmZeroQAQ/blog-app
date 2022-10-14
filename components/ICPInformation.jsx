import React from 'react';
import styled from 'styled-components';

function ICPInformation() {

    return (
        <ICPInformationStyle>
            <hr />
            {/* <span className='copyright'>© 2022-2022 JmZeroQAQ 版权所有</span>
            <span>  |  </span> */}
            <a href="https://beian.miit.gov.cn" rel='noreferrer'>赣ICP备2022009054号-1</a>
        </ICPInformationStyle>
    );
}

const ICPInformationStyle = styled.div`
    & {
        font-size: 14px;
        padding: 10px 0px;
    }

    & hr {
        margin: 0px 0px 10px 0px;
    }

    /* & .copyright {
        color: #8C8C8C;
    } */

    & a {
        /* color: #337AB7; */
        color: #FB7299;
        text-decoration: none;
    }

    & a:hover {
        color: #FF90D1;
        text-decoration: underline;
    }
`

export default ICPInformation;