import { Image, StyleSheet, View } from 'react-native';

import { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import { mockData } from '@/constants/data';
import { Card } from '@/components/Card';

type ItemDetails = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  categories: Array<string>;
  image: string;
};

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Array<ItemDetails>>([]);
  const [error, setError] = useState(false);

  // const data = await mainDealsData();

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: REMOVE MOCKDATA AND USE URL ONCE DESIGN IS COMPLETE
        // const response = await axios.get('http://localhost:3000/main-deals/1');
        // const arrayItems: Array<ItemDetails> = response.data;
        const response = mockData;
        setData(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    // TODO: REMOVE HEADER TO SUIT FIGMA
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.itemContainer}>
        <ThemedText>{loading ? 'Please wait' : ''}</ThemedText>
        <View>
          {data
            ? data.map((item, i) => {
                return (
                  <Card
                    key={i}
                    imageUrl={item.image}
                    pubDate={item.pubDate}
                    categories={item.categories}
                    title={item.title}
                    description={item.description}
                    link={item.link}
                  />
                );
              })
            : ''}
        </View>
        <ThemedText>{error ? error : ''}</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  itemContainer: {
    padding: 0,
  },
});
