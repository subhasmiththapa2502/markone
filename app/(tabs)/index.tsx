import React, { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchGames, setSelectedGameId, addToFavorites, removeFromFavorites } from '@/components/dataSlice';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function TabOneScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { games, status, error, favorites } = useSelector((state: RootState) => state.data);
  const navigation = useNavigation();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGames());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
  }

  if (status === 'failed') {
    return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
    );
  }

  const handleDetailsPress = (gameId: number) => {
    dispatch(setSelectedGameId(gameId));
    navigation.navigate('details');
  };

  const handleFavoritePress = (gameId: number) => {
    const gameToAddOrRemove = games.find(game => game.id === gameId);
    if (gameToAddOrRemove) {
      if (isGameInFavorites(gameId)) {
        dispatch(removeFromFavorites(gameId));
      } else {
        dispatch(addToFavorites(gameToAddOrRemove));
      }
    }
  };

  const isGameInFavorites = (gameId: number) => {
    return favorites.some(game => game.id === gameId);
  };

  return (
      <View style={styles.container}>
        <FlatList
            style={styles.list}
            data={games}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.itemContainerColumn}>
                  <View style={styles.itemContainer}>
                    <View style={styles.gameItem}>
                      <Image source={{ uri: item.iconURL }} style={styles.image} />
                      <View style={styles.textContainer}>
                        <Text style={styles.gameName}>{item.title}</Text>
                        <Text style={styles.gameDetails}>{item.rating}</Text>
                      </View>
                      <TouchableOpacity
                          style={styles.iconContainer}
                          onPress={() => handleFavoritePress(item.id)}
                      >
                        <FontAwesome
                            name={isGameInFavorites(item.id) ? 'heart' : 'heart-o'}
                            size={20}
                            color={'red'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.button} onPress={() => handleDetailsPress(item.id)}>
                    <Text style={styles.buttonText}>Details</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    width: '100%',
  },
  itemContainerColumn: {
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  gameItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  iconContainer: {
    marginLeft: 'auto',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
