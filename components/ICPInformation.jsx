import React from 'react';
import styled from 'styled-components';

function ICPInformation() {

    return (
        <ICPInformationStyle>
            <hr />
            <div className="d-flex flex-wrap">
                {/* <div>
                    <span className='copyright'>© 2022-2022 JmZeroQAQ 版权所有</span>
                    <span className='d-none d-sm-inline split'>  |  </span>
                </div> */}
                <div>
                    <a href="https://beian.miit.gov.cn" target="_bank" rel='noreferrer'>赣ICP备2022009054号-1</a>
                    <span className='d-none d-sm-inline split'>  |  </span>
                </div>

                <div>
                    <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36073302000169" target="_bank" rel="noreferrer">
                        <img src={require("../images/policeIcon.png")} alt="" />
                        <span>赣公网安备 36073302000169号</span>
                    </a>
                </div>
            </div>
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
        color: #FB7299;
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

    & .split {
        margin: 0 10px;
    }
`

export default ICPInformation;