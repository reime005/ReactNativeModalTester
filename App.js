/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { FlatListModal } from './FlatListModal';
import { ScrollModal } from './ScrollModal';
import { LegacyScrollModal } from './LegacyScrollModal';

const App = () => {
  const [legacyScrollModalVisible, setLegacyScrollModalVisible] = useState(
    false,
  );
  const [scrollModalVisible, setScrollModalVisible] = useState(false);
  const [flatListModalVisible, setFlatListModalVisible] = useState(false);

  const toggleLegacyScrollModal = () =>
    setLegacyScrollModalVisible(!legacyScrollModalVisible);
  const toggleScrollModal = () => setScrollModalVisible(!scrollModalVisible);
  const toggleFlatListModal = () =>
    setFlatListModalVisible(!flatListModalVisible);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <LegacyScrollModal
            visible={legacyScrollModalVisible}
            onDismiss={toggleLegacyScrollModal}
          />

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
          testID="btn_legacy_scroll_modal_toggle"
          title="Toggle Legacy Scroll Modal"
          onPress={toggleLegacyScrollModal}
        />

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
