import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors, Spacing, Typography, Shadows, BorderRadius } from '../theme';
import { Globe, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        title: 'Lihat Bencana Terkini',
        subtitle: 'Temukan informasi bencana yang membutuhkan bantuan di seluruh Indonesia',
        icon: <Globe size={80} color={Colors.primary} />,
        bgColor: '#eef2fb',
    },
    {
        id: '2',
        title: 'Donasi dengan Mudah',
        subtitle: 'Salurkan bantuan dalam hitungan menit, aman dan terpercaya melalui berbagai metode pembayaran pilihan Anda.',
        icon: <HeartHandshake size={80} color={Colors.primary} />,
        bgColor: '#eef2fb',
    },
    {
        id: '3',
        title: 'Pantau Penyaluran',
        subtitle: 'Lacak ke mana donasimu disalurkan secara transparan',
        icon: <ShieldCheck size={80} color={Colors.primary} />,
        bgColor: '#eef2fb',
    },
];

interface OnboardingScreenProps {
    navigation: any;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
            setCurrentIndex(currentIndex + 1);
        } else {
            navigation.replace('Login');
        }
    };

    const handleSkip = () => {
        navigation.replace('Login');
    };

    const renderSlide = ({ item }: { item: (typeof slides)[0] }) => (
        <View style={styles.slide}>
            {/* Illustration Area */}
            <View style={[styles.illustrationArea, { backgroundColor: item.bgColor }]}>
                <View style={styles.illustrationBox}>
                    {item.icon}
                </View>
            </View>
        </View>
    );

    const isLastSlide = currentIndex === slides.length - 1;

    return (
        <View style={styles.container}>
            {/* Slides */}
            <Animated.FlatList
                ref={flatListRef}
                data={slides}
                renderItem={renderSlide}
                keyExtractor={item => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false },
                )}
                onMomentumScrollEnd={e => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
                scrollEventThrottle={16}
            />

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                {/* Dots */}
                <View style={styles.dotsContainer}>
                    {slides.map((_, index) => {
                        const inputRange = [
                            (index - 1) * width,
                            index * width,
                            (index + 1) * width,
                        ];
                        const dotWidth = scrollX.interpolate({
                            inputRange,
                            outputRange: [8, 24, 8],
                            extrapolate: 'clamp',
                        });
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp',
                        });
                        return (
                            <Animated.View
                                key={index}
                                style={[styles.dot, { width: dotWidth, opacity }]}
                            />
                        );
                    })}
                </View>

                {/* Title & Subtitle */}
                <Text style={styles.title}>{slides[currentIndex].title}</Text>
                <Text style={styles.subtitle}>{slides[currentIndex].subtitle}</Text>

                {/* Navigation */}
                <View style={styles.navRow}>
                    <TouchableOpacity onPress={handleSkip}>
                        <Text style={styles.skipText}>Lewati</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.nextButton,
                            isLastSlide && styles.nextButtonLarge,
                        ]}
                        onPress={handleNext}>
                        {isLastSlide ? (
                            <Text style={styles.nextButtonText}>Mulai</Text>
                        ) : (
                            <ArrowRight size={24} color={Colors.white} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.cardBackground,
    },
    slide: {
        width,
    },
    illustrationArea: {
        width,
        height: height * 0.45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    illustrationBox: {
        width: 160,
        height: 160,
        borderRadius: BorderRadius.xl,
        backgroundColor: Colors.cardBackground,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.float,
    },
    bottomSection: {
        flex: 1,
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.lg,
        paddingBottom: Spacing.xl,
        backgroundColor: Colors.cardBackground,
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.lg,
        gap: 6,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.primary,
    },
    title: {
        ...Typography.h2,
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
    },
    subtitle: {
        ...Typography.body,
        color: Colors.textMuted,
        lineHeight: 22,
    },
    navRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
        paddingTop: Spacing.lg,
    },
    skipText: {
        ...Typography.bodyMd,
        color: Colors.textMuted,
    },
    nextButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextButtonLarge: {
        width: 120,
        borderRadius: 28,
        paddingHorizontal: Spacing.md,
    },
    nextArrow: {
        fontSize: 22,
        color: Colors.white,
        fontWeight: '700',
    },
    nextButtonText: {
        ...Typography.button,
        color: Colors.white,
    },
});

export default OnboardingScreen;