import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFromFavorites } from '@/components/dataSlice';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabTwoScreen() {
  const { favorites } = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (gameId: number) => {
    dispatch(removeFromFavorites(gameId));
  };

  return (
      <View style={styles.container}>
        <FlatList
            style={styles.list}
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Image source={{ uri: item.iconURL }} style={styles.image} />
                  <View style={styles.textContainer}>
                    <Text style={styles.gameName}>{item.title}</Text>
                    <Text style={styles.gameDetails}>{item.rating}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveFavorite(item.id)}>
                    <FontAwesome name="heart" size={20} color={'red'} />
                  </TouchableOpacity>
                </View>
            )}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  list: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  gameName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameDetails: {
    fontSize: 14,
    color: '#666',
  },
});
