import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";

import RNModal from "react-native-modal/src";

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

const scrollElementHeightPercent = 45;
const scrollElementHeightPercentStr = `${scrollElementHeightPercent}%`;
const scrollBarBorderRadius = 6;

export const ImageScrollModal = (props: Props) => {
  const [contentOffset, setContentOffset] = useState({ x: 0, y: 0 });
  const scrollRef = useRef<ScrollView>(null);
  const [contentSize, setContentSize] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  let scrollPosPercent;

  if (contentOffset.y > 0) {
    scrollPosPercent =
      (contentOffset.y / (contentSize - scrollViewHeight)) * (100 - scrollElementHeightPercent);
  }

  const onDismiss = () => {
    setContentOffset({ x: 0, y: 0 });
    props.onDismiss();
  }

  return (

    <RNModal
      testID={"image_scroll_modal"}
      style={{
        position: "relative",
        flex: 1,
        justifyContent: "flex-end",
        borderRadius: 16,
      }}
      scrollTo={(e, propagated) => {
        if (propagated) {
          scrollRef.current?.scrollTo(e);
        }

        if (typeof e.y === "number") {
          let newOffset = {
            x: contentOffset.x || e.x,
            y: contentOffset.y || e.y,
          };

          setContentOffset(newOffset);
        }
      }}
      scrollOffset={contentOffset.y}
      propagateSwipe={true}
      coverScreen={true}
      isVisible={props.visible}
      onSwipeComplete={onDismiss}
      swipeDirection="down"
      onBackdropPress={onDismiss}
    >
      <View style={styles.container} testID="flatlist_modal_view">
        <View
          testID={"pull_down_bar"}
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            height: "15%",
            backgroundColor: "transparent",
          }}
        >
          <View
            style={{
              marginBottom: 8,
              width: "20%",
              height: 4,
              borderRadius: 4,
              backgroundColor: "white",
            }}
          />
        </View>

        <View
          style={{
            position: "absolute",
            right: 20,
            top: "20%",
            marginBottom: 8,
            width: 8,
            height: 100,
            borderRadius: scrollBarBorderRadius,
            backgroundColor: "rgba(255,255,255,.5)",
            zIndex: 1,
          }}
        >
          <View
            style={{
              position: "absolute",
              left: -1,
              top: `${Number(scrollPosPercent || 0).toFixed(0)}%`,
              marginBottom: 8,
              width: 10,
              height: scrollElementHeightPercentStr,
              borderRadius: scrollBarBorderRadius + 2,
              backgroundColor: "rgba(255,255,255,.7)",
            }}
          ></View>
        </View>

        <View
          style={{
            width: "100%",
            flex: 1,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <ScrollView
            testID="image_scroll_view"
            ref={scrollRef}
            scrollEventThrottle={16}
            onLayout={(e) => {
              setScrollViewHeight(e.nativeEvent.layout.height);
            }}
            onContentSizeChange={(_, height) => {
              setContentSize(height);
            }}
            showsVerticalScrollIndicator={false}
            bounces={false}
            disableScrollViewPanResponder
            onScroll={(e: any) => {
              setContentOffset(e.nativeEvent.contentOffset);
            }}
            automaticallyAdjustContentInsets={false}
            style={styles.scrollView}
          >
            <Image
              source={require("./assets/images/1.jpg")}
              style={styles.image}
            />

            <Image
              source={require("./assets/images/2.jpg")}
              style={styles.image}
            />

            <Image
              source={require("./assets/images/3.jpg")}
              style={styles.image}
            />

            <Image
              testID={"last_image_in_scrollview"}
              source={require("./assets/images/4.jpg")}
              style={styles.image}
            />
          </ScrollView>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "transparent",
    borderRadius: 16,
    height: 250,
  },
  scrollView: {},
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
