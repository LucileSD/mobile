import API_KEY from '../key';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Button } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

export default function Minifig() {

  const [lego, setLego] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [theme, setTheme] = useState([
    { label: 'City', value: 52 },
    { label: 'Town', value: 50 },
    { label: 'Racers', value: 112 },
    { label: 'Space', value: 126 },
    { label: 'Castle', value: 186 },
    { label: 'Technic', value: 1 },
    { label: 'Creator', value: 22 },
    { label: 'Marvel', value: 207 },
    { label: 'Harry Potter', value: 246},
    { label: 'Toy Story', value: 275}
  ]);
  const [nextPage, setNextPage] = useState(null);

  const getLego = (page) => {
    fetch(`https://rebrickable.com/api/v3/lego/minifigs/?page=${page}&in_theme_id=${value}`,
      { headers: { Authorization: `key ${API_KEY}`}})
      .then((res) => {
        return res.json()
      }).then((data) => {
        setNextPage(data.next);
        setLego(data.results)
      })
  };

  const getPage = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    getLego(page);
  }, [page, value])

  return (
    <View>
      <DropDownPicker
        open={open}
        value={value}
        items={theme}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setTheme}
      />
      <ScrollView style={styles.container}>
        {lego.map((one, id) => (
          <View key={`b-${id}`} style={styles.view}>
            <Text key={id}>{one.name}</Text>
            <Image source={{ uri: one.set_img_url }} style={styles.img} key={`a-${id}`}/>
          </View>
        ))}
        {nextPage ? 
        <Button
          onPress={getPage}
          title='Plus de Minifig'
          color='#f50303'
          accessibilityLabel='Charger plus'
        /> : <Text></Text>}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '5%',
  },
  img: {
    width: 200,
    height: 200,
    marginBottom: 5
  },
  view: {
    alignItems: 'center'
  }
})
