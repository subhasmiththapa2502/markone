import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { fetchGameDetails } from '@/components/dataSlice';

const details: React.FC = () => {
    const selectedGameId = useSelector((state: RootState) => state.data.selectedGameId);
    const dispatch = useDispatch();
    const selectedGameDetails = useSelector((state: RootState) => state.data.selectedGameDetails);

    useEffect(() => {
        if (selectedGameId) {
            dispatch(fetchGameDetails(selectedGameId));
        }
    }, [dispatch, selectedGameId]);

    if (!selectedGameDetails) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.bannerContainer}>
                <Image source={{ uri: selectedGameDetails.bannerURL }} style={styles.bannerImage} />
                <View style={styles.bottomImageContainer}>
                    <Image source={{ uri: selectedGameDetails.iconURL }} style={styles.bottomImage} />
                </View>
            </View>
            <View style={styles.content}>
                <Text>Title: {selectedGameDetails.title}</Text>
                <Text>Rating: {selectedGameDetails.rating}</Text>
                <Text>Rating: {selectedGameDetails.description}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
    },
    bannerContainer: {
        position: 'relative',
    },
    bannerImage: {
        width: '100%',
        height: 200, // Adjust height as per design
        resizeMode: 'cover',
    },
    bottomImageContainer: {
        position: 'absolute',
        bottom: -60,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomImage: {
        width: 100,
        height: 100, // Adjust height as per design
        resizeMode: 'cover',
    },
    content: {
        padding: 20,
        marginTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

export default details;
