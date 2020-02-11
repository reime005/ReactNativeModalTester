/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { FlatListModal } from './FlatListModal';
import { ScrollModal } from './ScrollModal';

const App: () => React$Node = () => {
  const [scrollModalVisible, setScrollModalVisible] = useState(false);
  const [flatListModalVisible, setFlatListModalVisible] = useState(false);

  const toggleScrollModal = () => setScrollModalVisible(!scrollModalVisible);
  const toggleFlatListModal = () =>
    setFlatListModalVisible(!flatListModalVisible);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <ScrollModal
            visible={scrollModalVisible}
            onDismiss={toggleScrollModal}
          />

          <FlatListModal
            visible={flatListModalVisible}
            onDismiss={toggleFlatListModal}
          />
        </View>

        <Button
          testID="btn_scroll_modal_toggle"
          title="Toggle Scroll Modal"
          onPress={toggleScrollModal}
        />

        <Button
          testID="btn_flatlist_modal_toggle"
          title="Toggle FlatList Modal"
          onPress={toggleFlatListModal}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  container: { flex: 1 },
  modalContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
