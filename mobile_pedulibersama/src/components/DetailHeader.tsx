import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ArrowLeft, Share2, Heart } from 'lucide-react-native';
import { Colors } from '../theme';

interface DetailHeaderProps {
    imageUrl: any;
    onBack: () => void;
    onShare?: () => void;
    onFavorite?: () => void;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({ imageUrl, onBack, onShare, onFavorite }) => {
    return (
        <View style={styles.container}>
            <Image source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} style={styles.image} />
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

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24;

const styles = StyleSheet.create({
    container: { height: 320, position: 'relative' },
    image: { width: '100%', height: '100%', backgroundColor: '#E5E7EB' },
    topBar: { position: 'absolute', top: STATUSBAR_HEIGHT + 16, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between' },
    rightIcons: { flexDirection: 'row' },
    iconButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center' },
});

export default DetailHeader;
