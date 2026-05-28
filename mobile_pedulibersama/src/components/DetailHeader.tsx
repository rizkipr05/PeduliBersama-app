import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft, Share2, Heart } from 'lucide-react-native';
import { Colors } from '../theme';

interface DetailHeaderProps {
    imageUrl: string;
    onBack: () => void;
    onShare?: () => void;
    onFavorite?: () => void;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({ imageUrl, onBack, onShare, onFavorite }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.iconButton} onPress={onBack}>
                    <ArrowLeft color={Colors.textPrimary} size={24} />
                </TouchableOpacity>
                <View style={styles.rightIcons}>
                    <TouchableOpacity style={styles.iconButton} onPress={onShare}>
                        <Share2 color={Colors.textPrimary} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iconButton, { marginLeft: 12 }]} onPress={onFavorite}>
                        <Heart color={Colors.textPrimary} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { height: 300, position: 'relative' },
    image: { width: '100%', height: '100%', backgroundColor: '#E5E7EB' },
    topBar: { position: 'absolute', top: 40, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between' },
    rightIcons: { flexDirection: 'row' },
    iconButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center' },
});

export default DetailHeader;
