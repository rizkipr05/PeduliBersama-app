import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../theme';

const HistoryScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>History Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        ...Typography.h2,
        color: Colors.textPrimary,
    },
});

export default HistoryScreen;
