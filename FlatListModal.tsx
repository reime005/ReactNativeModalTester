import React, { useState, useRef } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal/src';

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

export const FlatListModal = (props: Props) => {
  const [contentOffset, setContentOffset] = useState({ x: 0, y: 0 });
  const scrollRef = useRef<FlatList>(null);

  return (
    <Modal
      testID={'modal'}
      scrollTo={(e, propagated) => {
        if (propagated) {
          scrollRef.current?.scrollToOffset({ offset: e.y || 0 });
        }

        if (typeof e.y === 'number') {
          setContentOffset({
            x: contentOffset.x || e.x,
            y: contentOffset.y || e.y,
          });
        }
      }}
      scrollOffset={contentOffset.y}
      propagateSwipe={true}
      coverScreen={false}
      isVisible={props.visible}
      onSwipeComplete={props.onDismiss}
      swipeDirection="down"
      onBackdropPress={props.onDismiss}>
      <View style={styles.container} testID="flatlist_modal_view">
        <FlatList
          ref={scrollRef}
          testID="flatlist_view"
          scrollEventThrottle={16}
          contentOffset={contentOffset}
          onScroll={(e: any) => {
            setContentOffset(e.nativeEvent.contentOffset);
          }}
          renderItem={({ item }) => (
            <Text testID={`scroll_item_${item.key}`}>
              scroll item #{item.key}
            </Text>
          )}
          data={Array.from({ length: 50 }, (value, key) => ({
            key: String(key),
          }))}
          style={styles.scrollView}
        />

        <Text testID="flatlist_fixed_text">random non scroll item</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 5,
    padding: 15,
  },
  scrollView: {
    height: 150,
    marginTop: 15,
    marginBottom: 15,
  },
  safeAreaView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
});
