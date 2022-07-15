import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Pressable, Alert } from 'react-native';
import bg from './assets/bg.jpeg'

export default function App() {
	const [map, setMap] = useState([
		["","",""],
		["","",""],
		["","",""],
	])

	const [currentTurn, setCurrentTurn] = useState('x')

	const onPress = (rowIndex, columnIndex) => {
		if (map[rowIndex][columnIndex] != '') {
			Alert.alert("Position already occupied");
			return;
		}
		setMap((existingMap) => {
			const updatedMap = [...existingMap]
			updatedMap[rowIndex][columnIndex] = currentTurn
			return updatedMap
		})
		
		setCurrentTurn(currentTurn === 'x' ? 'o' : 'x')
		checkWinningState();
	}

	const checkWinningState = () => {
		for (let i = 0; i < 3; i++){
			const isRowXWinning = map[i].every((cell) => cell === 'x')
			const isRowOWinning = map[i].every((cell) => cell === 'o')

			if(isRowOWinning) {
				resetGame()
			}
			if(isRowXWinning) {
				resetGame()
			}
		}

		for (let c = 0; c < 3; c++) {
			let isColumnXWinner = true;
			let isColumnOWinner = true;

			for (let r = 0; r < 3; r++) {
				if (map[r][c] != 'x') isColumnXWinner = false
				if (map[r][c] != 'o') isColumnOWinner = false
			}
			if (isColumnOWinner) resetGame()
			if (isColumnXWinner) resetGame()
		}

		let isDiagonalOWinner = true;
		let isDiagonalXWinner = true;
		for (let c = 0; c < 3; c++) {

			for (let r = 0; r < 3; r++) {
				if (r===c) {
					if (map[r][c] != 'x') isDiagonalXWinner = false
					if (map[r][c] != 'o') isDiagonalOWinner = false
				}
			}
		}
		if (isDiagonalOWinner) resetGame()
		if (isDiagonalXWinner) resetGame()
	}

	const resetGame = () => {
		Alert.alert('Game Over')
		setMap([
			["","",""],
			["","",""],
			["","",""],
		]);
		setCurrentTurn('x');
	}

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={bg}
        style={styles.bg}
		resizeMode={'contain'}
      >
		<View style={styles.map}>
			{map.map((row, rowIndex) => (
				<View style={styles.row}>
				{row.map((cell, columnIndex) => (
					<Pressable style={styles.cell} onPress={() => onPress(rowIndex, columnIndex)}>
						{cell === 'o' && <View style={styles.circle} />}
						{cell === 'x' && 
						<View style={styles.cross}>
							<View style={styles.crossLine} />
							<View style={[styles.crossLine, styles.crossLineReversed]} />
						</View> 
						}
					</Pressable>
				))}
				</View>
			))}
			{/* <View style={styles.circle} />
			<View style={styles.cross}>
				<View style={styles.crossLine} />
				<View style={[styles.crossLine, styles.crossLineReversed]} />
			</View> */}
		</View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
	backgroundColor: "#242D34"
  },
  bg: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },
  map: {
	width: '80%',
	aspectRatio: 1,
  },
  row: {
	flex: 1,
	flexDirection: 'row',
  },
  cell: {
	width: 100,
	height: 100,
	flex: 1,
  },
  circle: {
	flex: 1,
	width: 75,
	height:75,
	borderRadius: 50,
	alignItems: "center",
    justifyContent: "center",
	margin: 10,
	borderWidth: 10,
	borderColor: "white",
  },
  cross: {
	flex:1,
  },
  crossLine: {
	position: 'absolute',
	left: '48%',
	width: 10,
	height: 50,
	backgroundColor: "white",
	borderRadius: 5,
	transform: [
		{
			rotate: '45deg'
		},
	]
  },
  crossLineReversed: {
	transform: [
		{
			rotate: '315deg'
		},
	]
  }
});
