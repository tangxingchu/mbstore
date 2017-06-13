import React, {Component} from 'react';


export default class Content extends Component {
	
	constructor() {
		super();
	}

	render() {
		
		return(
			<div>这是内容了
				{this.props.children}
			</div>
		)
	}

}

const styles = {

}