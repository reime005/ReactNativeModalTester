import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal/src';

interface State {
  scrollOffset: any;
}

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

export class LegacyScrollModal extends React.Component<Props, State> {
  scrollRef: React.RefObject<ScrollView>;

  constructor(props: Props) {
    super(props, {
      scrollOffset: null,
    });
    this.state = { scrollOffset: { x: 0, y: 0 } };
    this.scrollRef = React.createRef();
  }
  handleOnScroll = (event: any) => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset,
    });
  };
  handleScrollTo = (event: any) => {
    this.scrollRef.current?.scrollTo(event);

    this.setState({
      scrollOffset: {
        x: this.state.scrollOffset.x || event.x,
        y: this.state.scrollOffset.y || event.y,
      },
    });
  };

  render(): React.ReactElement<any> {
    return (
      <Modal
        testID={'modal'}
        propagateSwipe={true}
        isVisible={this.props.visible}
        onSwipeComplete={this.props.onDismiss}
        swipeDirection={['down']}
        scrollTo={this.handleScrollTo}
        scrollOffset={this.state.scrollOffset.y}
        scrollOffsetMax={400 - 300} // content height - ScrollView height
        style={styles.modal}>
        <View style={styles.scrollableModal}>
          <ScrollView
            testID="legacy_scroll_view"
            ref={this.scrollRef}
            contentOffset={this.state.scrollOffset}
            onScroll={this.handleOnScroll}
            scrollEventThrottle={16}>
            <View style={styles.scrollableModalContent1}>
              <Text style={styles.scrollableModalText1}>
                You can scroll me up! 👆
              </Text>
            </View>
            <View style={styles.scrollableModalContent2}>
              <Text style={styles.scrollableModalText2}>
                Same here as well! ☝
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: 300,
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white',
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: '#A9DCD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText2: {
    fontSize: 20,
    color: 'white',
  },
});
