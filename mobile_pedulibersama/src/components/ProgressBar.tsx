import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../theme';

interface ProgressBarProps {
    progress: number; // 0 to 1
    color?: string;
    height?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    color = Colors.primary,
    height = 6,
}) => {
    // Memastikan progress tetap di antara 0 dan 1
    const clampedProgress = Math.min(Math.max(progress, 0), 1);

    return (
        <View style={[styles.container, { height }]}>
            <View
                style={[
                    styles.bar,
                    {
                        width: `${clampedProgress * 100}%`,
                        backgroundColor: color,
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        borderRadius: 4,
    },
});

export default ProgressBar;
