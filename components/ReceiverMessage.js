import { View, Text, Image } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'

const ReceiverMessage = ({ message }) => {

	const tw = useTailwind()

	return (
		<View
			style={[
				tw("rounded-lg rounded-tl-none px-5 py-3 mx-3 my-1.5 "),
				{ alignSelf: "flex-start", backgroundColor: "#D9EDFF"}
			]}
		>
			<Text style={tw("")}>
				{message.text}
			</Text>
		</View>
	)
}

export default ReceiverMessage