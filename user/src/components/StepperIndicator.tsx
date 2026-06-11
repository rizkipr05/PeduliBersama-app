import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../theme';

interface StepperIndicatorProps {
    currentStep: number;
    totalSteps?: number;
}

const StepperIndicator: React.FC<StepperIndicatorProps> = ({ currentStep, totalSteps = 3 }) => {
    return (
        <View style={styles.container}>
            {Array.from({ length: totalSteps }).map((_, index) => (
                <View 
                    key={index} 
                    style={[
                        styles.step, 
                        index < currentStep ? styles.activeStep : styles.inactiveStep
                    ]} 
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', paddingHorizontal: Spacing.md, gap: Spacing.sm, marginBottom: Spacing.lg, marginTop: Spacing.md },
    step: { flex: 1, height: 4, borderRadius: 2 },
    activeStep: { backgroundColor: Colors.primary },
    inactiveStep: { backgroundColor: '#E2E8F0' },
});
export default StepperIndicator;
