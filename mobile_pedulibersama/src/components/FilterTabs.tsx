import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../theme';

interface FilterTabsProps {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {tabs.map((tab, index) => {
                const isActive = activeTab === tab;
                return (
                    <TouchableOpacity
                        key={index}
                        style={[styles.tab, isActive && styles.activeTab]}
                        onPress={() => onTabChange(tab)}
                        activeOpacity={0.8}
                        accessible={true}
                        accessibilityRole="tab"
                        accessibilityState={{ selected: isActive }}
                        accessibilityLabel={`Filter ${tab}`}
                    >
                        <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        gap: Spacing.sm,
    },
    tab: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#E8EAF6', // light blue/grey bg
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: Colors.primary,
    },
    tabText: {
        ...Typography.body,
        color: Colors.textMuted,
        fontWeight: '500',
    },
    activeTabText: {
        color: Colors.surface,
        fontWeight: '600',
    },
});

export default FilterTabs;
