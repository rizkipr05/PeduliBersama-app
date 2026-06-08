import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

interface ProfileMenuItemProps {
    title: string;
    icon: React.ReactNode;
    isDestructive?: boolean;
    hasSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    onPress?: () => void;
    hideBorder?: boolean;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
    title,
    icon,
    isDestructive = false,
    hasSwitch = false,
    switchValue = false,
    onSwitchChange,
    onPress,
    hideBorder = false,
}) => {
    return (
        <TouchableOpacity 
            style={[styles.container, !hideBorder && styles.borderBottom]} 
            onPress={onPress}
            disabled={hasSwitch} // Disable tap if it's a switch item
            activeOpacity={0.7}
        >
            <View style={[styles.iconBox, isDestructive && styles.iconBoxDestructive]}>
                {icon}
            </View>
            
            <Text style={[styles.title, isDestructive && styles.titleDestructive]}>
                {title}
            </Text>

            {hasSwitch ? (
                <Switch 
                    value={switchValue} 
                    onValueChange={onSwitchChange}
                    trackColor={{ false: '#D1D5DB', true: Colors.primary }}
                    thumbColor={Colors.surface}
                />
            ) : (
                <ChevronRight color={Colors.border} size={20} />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#E6F4EA', // Light green
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    iconBoxDestructive: {
        backgroundColor: '#FDE8E8', // Light red
    },
    title: {
        ...Typography.bodyMd,
        color: Colors.textPrimary,
        fontWeight: '600',
        flex: 1,
    },
    titleDestructive: {
        color: '#D13C4B',
    },
});

export default ProfileMenuItem;
