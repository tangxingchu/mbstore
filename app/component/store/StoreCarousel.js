import React, {Component} from 'react';
import { Carousel } from 'antd';


export default class StoreCarousel extends Component {
	
	constructor() {
		super();
	}

	render() {
		return(
			<Carousel autoplay>
				<div style={{width: '100%'}}><image src="/public/image/cmschina.png" style={{width: '100%', height: '100%'}} /></div>
				<div style={{backgroundColor:'red'}}><h3>2</h3></div>
				<div><h3>3</h3></div>
				<div><h3>4</h3></div>
		    </Carousel>
		)
	}

}

const styles = {
	
}