import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal/src';

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

export const ScrollModal = (props: Props) => {
  const [contentOffset, setContentOffset] = useState({ x: 0, y: 0 });

  return (
    <Modal
      testID={'modal'}
      scrollTo={e => {
        if (typeof e.y === 'number') {
          setContentOffset({
            x: contentOffset.x || e.x,
            y: contentOffset.y || e.y,
          });
        }
      }}
      scrollOffset={contentOffset.y}
      propagateSwipe={true}
      coverScreen={true}
      isVisible={props.visible}
      onSwipeComplete={props.onDismiss}
      swipeDirection="down">
      <View style={styles.container} testID="scroll_modal_view">
        <ScrollView
          testID="scroll_view"
          scrollEventThrottle={16}
          contentOffset={contentOffset}
          onScroll={(e: any) => {
            setContentOffset(e.nativeEvent.contentOffset);
          }}
          style={styles.scrollView}>
          {Array.from({ length: 50 }).map((el, idx) => (
            <Text key={idx} testID={`scroll_item_${idx}`}>
              scroll item #{idx}
            </Text>
          ))}
        </ScrollView>

        <Text testID="scroll_fixed_text">random non scroll item</Text>
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
