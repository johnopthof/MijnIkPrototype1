import React from 'react';
import {
	View,
	Text,
	ActivityIndicator,
} from 'react-native';
import {Colors} from '../constants/Colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LinearGradient } from 'expo';
export default class Loader extends React.Component {
    render() {
        return (
			<View style={styles.container}>
				<LinearGradient style={[styles.headerGradient]} start={[0, 1]} end={[1, 0]} colors={[Colors.headerRight, Colors.headerLeft]}>
					<View style={styles.center}>
					<ActivityIndicator size="large" color={Colors.white} />
						<Text style={styles.text}>{this.props.title}</Text>
					</View>
				</LinearGradient>
			</View>
        )
    }
}
const styles = EStyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		paddingVertical: '20rem',
		color:'#ffffff',
		fontSize: '18rem',
		textAlign: 'center',
		lineHeight:'24rem',
		paddingHorizontal:'50rem',
		fontFamily: 'zemestro-medium',
	},
	center:{
		height:'200rem',
		justifyContent: 'center',
		alignItems:'center'
	},
	headerGradient: {
		flex: 1,
		flexDirection:'column',
		justifyContent: 'center',
		alignItems:'center'
	},
});