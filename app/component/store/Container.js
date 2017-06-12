import React, {Component} from 'react';
import {Row, Col} from 'antd';
import Panel from './Panel';

export default class Container extends Component {
    
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Row>
                <Col span={4}></Col>
                <Col span={16}>
                    <Row>
                        <Col span={6}>
                            <Panel></Panel>
                        </Col>
                        <Col span={18}>
							
						</Col>
                    </Row>
                </Col>
                <Col span={4}></Col>
            </Row>
        )
    }
}
