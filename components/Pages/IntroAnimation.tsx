import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming, useAnimatedStyle, runOnJS } from 'react-native-reanimated';

interface WelcomeAnimationProps {
    setShowAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({setShowAnimation}) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    // Start animation on mount
    opacity.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.ease) });
    scale.value = withTiming(1, { duration: 2500, easing: Easing.out(Easing.ease) }, () => {
      // Navigate to the homepage after the animation completes
      runOnJS(setShowAnimation)(false);
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animationContainer, animatedStyle]}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
      </Animated.View>
    </View>
  );
};

export default WelcomeAnimation;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282C34', // Customize with your preferred background color
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#61DAFB', // Customize with your preferred accent color
    padding: 40,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});
