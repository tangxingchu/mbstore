import React, {Component} from 'react';
import { Carousel } from 'antd';


export default class StoreCarousel extends Component {
	
	constructor(props) {
        super(props);
	}

	render() {
		let src1 = "http://superxmg.website/project/react_news_site/src/images/carousel_1.png";
		let src2 = "http://superxmg.website/project/react_news_site/src/images/carousel_2.jpg";
		let src3 = "http://superxmg.website/project/react_news_site/src/images/carousel_3.jpg";
		let src4 = "http://superxmg.website/project/react_news_site/src/images/carousel_4.jpg";
		return(
			<Carousel {...settings}>
				<div><img src={src1}/></div>
				<div><img src={src2}/></div>
				<div><img src={src3}/></div>
				<div><img src={src4}/></div>
		    </Carousel>
		)
	}

}

const settings = {
	dots:true,
	infinite:true,
	speed: 500,
	slidesToShow:1,
	autoplay:true,
	touchMove: true,
	swipeToSlide: true
}; 

const styles = {
	
}