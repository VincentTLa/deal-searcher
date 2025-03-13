import { StyleSheet, Text, View, ViewProps } from 'react-native';
import React from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

export type PillProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  category: string;
};

export default function Pill({
  style,
  lightColor,
  darkColor,
  category,
  ...otherProps
}: PillProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  );
  return (
    <View style={styles.pillContainer}>
      <Text style={styles.text}>{category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pillContainer: {
    backgroundColor: '#F7B500',
    borderRadius: 10,
    padding: 4,
    opacity: 0.85,
    paddingStart: 10,
    paddingEnd: 10,
  },
  text: {
    fontSize: 10,
  },
});
