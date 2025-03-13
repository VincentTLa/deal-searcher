import { Image, StyleSheet, Text, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import Pill from './ui/Pill';

export type CardProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  categories: Array<string>;
  pubDate: string;
};

export function Card({
  style,
  lightColor,
  darkColor,
  title,
  description,
  imageUrl,
  link,
  categories,
  pubDate,
  ...otherProps
}: CardProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  );

  return (
    <View style={[styles.card, { backgroundColor }, style]} {...otherProps}>
      <View style={styles.cardContent}>
        <View style={styles.column}>
          {/* TODO: STYLE DEAL STATUS - LONG RUNNING, NEW, ETC. */}
          <Text style={styles.dealStatus}>NEW</Text>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text>Posted on: {pubDate}</Text>
          {/* TODO: FIT PILLS INTO CARD - FLEX */}
          <View style={styles.categorySection}>
            {categories
              ? categories.slice(0, 3).map((category, i) => {
                  return <Pill key={i} category={category} />;
                })
              : ''}
          </View>
          {/* TODO: FIT TEXT INTO CARD */}
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    backgroundColor: '#ffffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 16,
    height: 200,
    maxHeight: 200,
  },
  categorySection: {
    flexDirection: 'row',
    columnGap: 4,
  },
  dealStatus: {
    margin: 0,
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
  column: {
    maxWidth: 80,
    gap: 10,
    padding: 2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 10,
    resizeMode: 'contain',
    backgroundColor: '#979C9E',
  },
  textContainer: {
    padding: 0,
    maxWidth: '100%',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
    paddingStart: 0,
    padding: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
    gap: 10,
  },
});
