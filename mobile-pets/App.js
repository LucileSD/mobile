import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {

  const [imgCat, setImgCat] = useState(' ');
  const [imgDog, setImgDog] = useState(' ');
  const [specie, setSpecie] = useState(true);

  const getCat = () => {
    fetch('https://api.thecatapi.com/v1/images/search?limit=10')
    .then((response) => {
      return response.json()
    }).then((data) => {
      data.map((one) => (
        setImgCat(one.url)
      ));
      setSpecie(true)
    })
  };

  const getDog = () => {
    fetch('https://api.thedogapi.com/v1/images/search?limit=10')
    .then((response) => {
      return response.json()
    }).then((data) => {
      data.map((one) => (
        setImgDog(one.url)
      ));
      setSpecie(false)
    })
  }

  useEffect(() => {
    getCat();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={specie ? {uri: imgCat} : {uri: imgDog}}
        style={styles.img}
      />
      <View style={styles.viewButton}>
        <View style={styles.button}>
          <Button
            onPress={getCat}
            title="Nouveau Chat"
            color="#841584"
            accessibilityLabel="Changer de chat"
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={getDog}
            title="Nouveau Chien"
            color="#841584"
            accessibilityLabel="Changer de chien"
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#696969',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '80%',
    height: '65%',
    marginBottom: '5%'
  },
  viewButton: {
    flexDirection: 'row',
    height: '7%'
  },
  button: {
    margin: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
