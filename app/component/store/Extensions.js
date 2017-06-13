import React, {Component} from 'react';
import StoreCarousel from './StoreCarousel';
import { Card } from 'antd';
import {Row, Col} from 'antd';

export default class Extensions extends Component {
	
	constructor() {
		super();
	}

	render() {
		return(
			<div>
				<div style={styles.carousel}>
					<StoreCarousel/>					
				</div>

				<div style={styles.title}>应用列表</div>
				<div style={styles.card}>
				<Row style={{padding: '5px'}}>
					<Col span={6}>
						<Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
							<div className="custom-image">
							  <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
							</div>
							<div className="custom-card">
							  <h3>Europe Street beat</h3>
							  <p>www.instagram.com</p>
							</div>
						  </Card>
					</Col>
					<Col span={6}>
						<Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
							<div className="custom-image">
							  <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
							</div>
							<div className="custom-card">
							  <h3>Europe Street beat</h3>
							  <p>www.instagram.com</p>
							</div>
						  </Card>
					</Col>
					<Col span={6}>
						<Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
							<div className="custom-image">
							  <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
							</div>
							<div className="custom-card">
							  <h3>Europe Street beat</h3>
							  <p>www.instagram.com</p>
							</div>
						  </Card>
					</Col>
					<Col span={6}>
						<Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
							<div className="custom-image">
							  <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
							</div>
							<div className="custom-card">
							  <h3>Europe Street beat</h3>
							  <p>www.instagram.com</p>
							</div>
						  </Card>
					</Col>
				</Row>
				<Row style={{padding: '5px'}}>
					<Col span={6}>
						<Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
							<div className="custom-image">
							  <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
							</div>
							<div className="custom-card">
							  <h3>Europe Street beat</h3>
							  <p>www.instagram.com</p>
							</div>
						  </Card>
					</Col>
					<Col span={6}>
						<Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
							<div className="custom-image">
							  <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
							</div>
							<div className="custom-card">
							  <h3>Europe Street beat</h3>
							  <p>www.instagram.com</p>
							</div>
						  </Card>
					</Col>
					<Col span={6}>
						<Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
							<div className="custom-image">
							  <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
							</div>
							<div className="custom-card">
							  <h3>Europe Street beat</h3>
							  <p>www.instagram.com</p>
							</div>
						  </Card>
					</Col>
					<Col span={6}>
						<Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
							<div className="custom-image">
							  <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
							</div>
							<div className="custom-card">
							  <h3>Europe Street beat</h3>
							  <p>www.instagram.com</p>
							</div>
						  </Card>
					</Col>
				</Row>
					<Row style={{padding: '5px'}}>
					<Col span={6}>
						<Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
							<div className="custom-image">
							  <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
							</div>
							<div className="custom-card">
							  <h3>Europe Street beat</h3>
							  <p>www.instagram.com</p>
							</div>
						  </Card>
					</Col>
					<Col span={6}>
						<Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
							<div className="custom-image">
							  <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
							</div>
							<div className="custom-card">
							  <h3>Europe Street beat</h3>
							  <p>www.instagram.com</p>
							</div>
						  </Card>
					</Col>
					<Col span={6}>
						<Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
							<div className="custom-image">
							  <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
							</div>
							<div className="custom-card">
							  <h3>Europe Street beat</h3>
							  <p>www.instagram.com</p>
							</div>
						  </Card>
					</Col>
					<Col span={6}>
						<Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
							<div className="custom-image">
							  <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
							</div>
							<div className="custom-card">
							  <h3>Europe Street beat</h3>
							  <p>www.instagram.com</p>
							</div>
						  </Card>
					</Col>
				</Row>
				</div>
			</div>
		)
	}

}

const styles = {
	carousel: {
		width: '100%',
		height: '320px',
		padding: '8px',
		borderLeft: '1px solid #bdbdbd',
		borderRight: '1px solid #bdbdbd',
		borderBottom: '1px solid #bdbdbd',
	},
	title: {
		fontSize: '20px',
		backgroundColor: '#f8f8f8',	
		borderLeft: '1px solid #bdbdbd',
		borderRight: '1px solid #bdbdbd',
		borderBottom: '1px solid #bdbdbd',
		height: '60px',
		padding: '14px',
	},
	card: {
		border: '1px solid #bdbdbd',
		borderTop: 'none',
	}
}