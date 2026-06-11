import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

export interface TimelineStep {
    id: string;
    title: string;
    description: string;
    date?: string;
    status: 'completed' | 'active' | 'upcoming';
}

interface TrackingTimelineProps {
    steps: TimelineStep[];
}

const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ steps }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Perjalanan Donasimu</Text>

            <View style={styles.timelineContainer}>
                {steps.map((step, index) => {
                    const isLast = index === steps.length - 1;
                    const isCompleted = step.status === 'completed';
                    const isActive = step.status === 'active';

                    return (
                        <View key={step.id} style={styles.stepRow}>
                            {/* Kiri: Ikon & Garis */}
                            <View style={styles.indicatorCol}>
                                <View style={[
                                    styles.iconContainer,
                                    isCompleted && styles.iconCompleted,
                                    isActive && styles.iconActive,
                                    step.status === 'upcoming' && styles.iconUpcoming,
                                ]}>
                                    {isCompleted && <Check color={Colors.surface} size={14} strokeWidth={3} />}
                                    {isActive && <View style={styles.activeDot} />}
                                </View>
                                {!isLast && (
                                    <View style={[
                                        styles.line,
                                        (isCompleted || isActive) ? styles.lineCompleted : styles.lineUpcoming
                                    ]} />
                                )}
                            </View>

                            {/* Kanan: Teks Konten */}
                            <View style={styles.contentCol}>
                                <View style={styles.titleRow}>
                                    <Text style={[
                                        styles.stepTitle,
                                        step.status === 'upcoming' && styles.textUpcoming
                                    ]}>{step.title}</Text>
                                    {step.date && (
                                        <Text style={[
                                            styles.stepDate,
                                            step.status === 'upcoming' && styles.textUpcoming
                                        ]}>{step.date}</Text>
                                    )}
                                </View>
                                <Text style={[
                                    styles.stepDesc,
                                    step.status === 'upcoming' && styles.textUpcoming
                                ]}>{step.description}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Spacing.lg,
        marginTop: Spacing.xl,
    },
    sectionTitle: {
        ...Typography.h3,
        color: Colors.textPrimary,
        marginBottom: Spacing.lg,
    },
    timelineContainer: {
        paddingLeft: Spacing.sm,
    },
    stepRow: {
        flexDirection: 'row',
    },
    indicatorCol: {
        alignItems: 'center',
        marginRight: Spacing.md,
        width: 24,
    },
    iconContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    iconCompleted: {
        backgroundColor: Colors.primary,
    },
    iconActive: {
        backgroundColor: Colors.surface,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    activeDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.primary,
    },
    iconUpcoming: {
        backgroundColor: '#E2E3E5',
    },
    line: {
        width: 2,
        flex: 1,
        marginVertical: 4,
    },
    lineCompleted: {
        backgroundColor: Colors.primary,
    },
    lineUpcoming: {
        backgroundColor: '#E2E3E5',
    },
    contentCol: {
        flex: 1,
        paddingBottom: Spacing.xl,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    stepTitle: {
        ...Typography.bodyMd,
        color: Colors.primary, // Default active/completed text color
        fontWeight: '600',
    },
    stepDate: {
        ...Typography.caption,
        color: Colors.textMuted,
        fontSize: 10,
    },
    stepDesc: {
        ...Typography.body,
        color: Colors.textMuted,
        lineHeight: 20,
    },
    textUpcoming: {
        color: '#A0A4A8', // Grey out text for upcoming steps
    },
});

export default TrackingTimeline;
