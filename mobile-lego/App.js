import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Minifig from './components/Minifig';
import Lego from './assets/lego.png'

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={Lego} style={styles.img}/>
      <Text style={styles.title}>Lego Minifig</Text>
      <Minifig/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4c44d',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50
  },
  title: {
    fontWeight: 'bold',
  },
  img: {
    width: 50,
    height: 50,
  }
});
