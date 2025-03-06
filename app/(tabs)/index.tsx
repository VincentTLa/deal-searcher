import { Image, StyleSheet, View } from 'react-native';

import { useEffect, useState } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';

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
        const response = await axios.get('http://localhost:3000/main-deals/1');
        const arrayItems: Array<ItemDetails> = response.data;
        setData(arrayItems);
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
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.itemContainer}>
        <ThemedText type="subtitle">Data Load</ThemedText>
        <ThemedText>{loading ? 'Please wait' : ''}</ThemedText>
        <View>
          {data
            ? data.map((item, i) => {
                return (
                  <View style={styles.stepContainer}>
                    {item.title}
                    {item.categories}
                  </View>
                );
              })
            : ''}
        </View>
        <ThemedText>{error ? error : ''}</ThemedText>
      </ThemedView>

      {/* <ThemedView>
        {data.map((item, index) => (
          <ThemedText key={index}>{item}</ThemedText>
        ))}
      </ThemedView> */}
      {/* <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{' '}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{' '}
          directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView> */}
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
    padding: 10,
  },
});
