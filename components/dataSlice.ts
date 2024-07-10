import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Game {
    id: number;
    title: string;
    iconURL: string;
    bannerURL: string;
    rating: string;
    description: string;
}

interface DataState {
    games: Game[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    selectedGameId: number | null;
    selectedGameDetails: Game | null;
    favorites: Game[];
}

const initialState: DataState = {
    games: [],
    status: 'idle',
    error: null,
    selectedGameId: null,
    selectedGameDetails: null,
    favorites: [],
};

const API_KEY = '01964fa8-f0e5-40fc-a13b-9f5c3a5415f3';
const BASE_URL = 'https://mock-game-api-9a408f047f23.herokuapp.com/api/games';

export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            headers: {
                'X-API-Key': API_KEY,
            },
        });
        return response.data as Game[];
    } catch (error) {
        throw new Error('Failed to fetch games');
    }
});

export const fetchGameDetails = createAsyncThunk('games/fetchGameDetails', async (gameId: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/${gameId}`, {
            headers: {
                'X-API-Key': API_KEY,
            },
        });
        console.log('details ----> ', response.data)
        return response.data as Game;
    } catch (error) {
        throw new Error('Failed to fetch game details');
    }
});

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setSelectedGameId: (state, action: PayloadAction<number | null>) => {
            state.selectedGameId = action.payload;
        },
        addToFavorites: (state, action: PayloadAction<Game>) => {
            const gameToAdd = action.payload;
            if (!state.favorites.find(game => game.id === gameToAdd.id)) {
                state.favorites.push(gameToAdd);
            }
        },
        removeFromFavorites: (state, action: PayloadAction<number>) => {
            state.favorites = state.favorites.filter(game => game.id !== action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchGames.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.games = action.payload;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(fetchGameDetails.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchGameDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedGameDetails = action.payload;
            })
            .addCase(fetchGameDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch game details';
            });
    },
});

export const { setSelectedGameId, addToFavorites, removeFromFavorites } = dataSlice.actions;

export default dataSlice.reducer;
