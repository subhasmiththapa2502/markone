import React from 'react';
import { Provider } from 'react-redux';
import {NavigationContainer, useNavigation} from '@react-navigation/native'; // If using navigation
import store from './app/store'; // Adjust import path as per your project structure
import TabOneScreen from './app/(tabs)/index'; // Adjust import path as per your project structure

const App: React.FC = () => {
    const navigation = useNavigation();
    console.log(' calling App.tsx')
    return (
        <Provider store={store}>
            <NavigationContainer>
                <TabOneScreen />
                {/* Add other navigation stacks, screens, or components here */}
            </NavigationContainer>
        </Provider>
    );
};

export default App;
