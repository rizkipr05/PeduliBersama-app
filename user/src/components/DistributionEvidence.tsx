import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Colors, Spacing, Typography } from '../theme';

interface DistributionEvidenceProps {
    imageUrl: any;
    caption: string;
}

const DistributionEvidence: React.FC<DistributionEvidenceProps> = ({ imageUrl, caption }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Bukti Penyaluran</Text>
            
            <View style={styles.imageWrapper}>
                <ImageBackground 
                    source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} 
                    style={styles.imageBg}
                    imageStyle={styles.imageStyle}
                >
                    <View style={styles.overlay}>
                        <Text style={styles.caption}>{caption}</Text>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Spacing.lg,
        marginTop: Spacing.md,
        marginBottom: Spacing.xxl,
    },
    sectionTitle: {
        ...Typography.h3,
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
    },
    imageWrapper: {
        borderRadius: 20,
        overflow: 'hidden',
        height: 180,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    imageBg: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    imageStyle: {
        borderRadius: 20,
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: Spacing.md,
    },
    caption: {
        ...Typography.bodyMd,
        color: Colors.surface,
        fontWeight: '500',
        lineHeight: 22,
    },
});

export default DistributionEvidence;
