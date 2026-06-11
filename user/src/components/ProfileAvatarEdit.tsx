import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

interface ProfileAvatarEditProps {
    imageUrl: any;
    onChangePhoto: () => void;
}

const ProfileAvatarEdit: React.FC<ProfileAvatarEditProps> = ({ imageUrl, onChangePhoto }) => {
    return (
        <View style={styles.container}>
            <View style={styles.avatarWrapper}>
                <Image source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} style={styles.avatar} />
                
                <TouchableOpacity style={styles.cameraBadge} activeOpacity={0.8} onPress={onChangePhoto}>
                    <Camera color={Colors.surface} size={16} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={onChangePhoto} activeOpacity={0.7}>
                <Text style={styles.changeText}>Ubah Foto</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: Spacing.xl,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: Spacing.md,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: Colors.surface,
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Colors.surface,
    },
    changeText: {
        ...Typography.bodyMd,
        color: Colors.primary,
        fontWeight: '600',
    },
});

export default ProfileAvatarEdit;
