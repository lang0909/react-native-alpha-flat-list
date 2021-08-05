import React, { useRef, useState } from "react";
import { FlatList, View } from "react-native";

import PropTypes from "prop-types";
import debounce from "lodash.debounce";

import Sidebar from "./components/Sidebar";

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 50,
};

export default function AlphaFlatList(props) {
  const [activeLetter, setActiveLetter] = useState(undefined);

  const flatListRef = useRef();
  const onViewableItemsChangedRef = useRef(onViewableItemsChanged);
  const viewabilityConfigRef = useRef(viewabilityConfig);

  function onScroll(activeLetter) {
    if (activeLetter) {
      let index = -1;
      index = props.data.findIndex((item, i) => {
        let firstVal = item[props.scrollKey].toUpperCase().charAt(0);
        firstVal = "#";
        let firstChar = item[props.scrollKey].toUpperCase().charCodeAt(0);
        if (
          (firstChar >= 65 && firstChar <= 90) ||
          (firstChar >= 12593 && firstChar <= 12622)
        ) {
          firstVal = item[props.scrollKey].toUpperCase().charAt(0);
          if (firstChar === 12594) {
            firstVal = "ㄱ";
          }
          if (firstChar === 12600) {
            firstVal = "ㄷ";
          }
          if (firstChar === 12611) {
            firstVal = "ㅂ";
          }
          if (firstChar === 12614) {
            firstVal = "ㅅ";
          }
          if (firstChar === 12617) {
            firstVal = "ㅈ";
          }
        } else {
          if (firstChar >= 44032 && firstChar <= 55203) {
            switch (true) {
              case firstChar < 45208:
                firstVal = "ㄱ";
                break;
              case firstChar < 45796:
                firstVal = "ㄴ";
                break;
              case firstChar < 46972:
                firstVal = "ㄷ";
                break;
              case firstChar < 47560:
                firstVal = "ㄹ";
                break;
              case firstChar < 48148:
                firstVal = "ㅁ";
                break;
              case firstChar < 49324:
                firstVal = "ㅂ";
                break;
              case firstChar < 50500:
                firstVal = "ㅅ";
                break;
              case firstChar < 51088:
                firstVal = "ㅇ";
                break;
              case firstChar < 52264:
                firstVal = "ㅈ";
                break;
              case firstChar < 52852:
                firstVal = "ㅊ";
                break;
              case firstChar < 53440:
                firstVal = "ㅋ";
                break;
              case firstChar < 54028:
                firstVal = "ㅌ";
                break;
              case firstChar < 54616:
                firstVal = "ㅍ";
                break;
              case firstChar < 55204:
                firstVal = "ㅎ";
                break;
            }
          }
        }
        if (firstVal === activeLetter) {
          if (i === 0) {
            return -1;
          }
          return i;
        }
      });

      setActiveLetter(activeLetter);

      if (index !== -1) {
        const options = {
          animated: false,
          offset: index * props.itemHeight,
        };

        flatListRef.current.scrollToOffset(options);
      }
    }
  }

  let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  if (props.displayOnlyAvailableLetters) {
    letters = [
      ...new Set(
        props.data.map((item) => {
          let firstVal = item[props.scrollKey].toUpperCase().charAt(0);
          firstVal = "#";
          let firstChar = item[props.scrollKey].toUpperCase().charCodeAt(0);
          if (
            (firstChar >= 65 && firstChar <= 90) ||
            (firstChar >= 12593 && firstChar <= 12622)
          ) {
            firstVal = item[props.scrollKey].toUpperCase().charAt(0);

            if (firstChar === 12594) {
              firstVal = "ㄱ";
            }
            if (firstChar === 12600) {
              firstVal = "ㄷ";
            }
            if (firstChar === 12611) {
              firstVal = "ㅂ";
            }
            if (firstChar === 12614) {
              firstVal = "ㅅ";
            }
            if (firstChar === 12617) {
              firstVal = "ㅈ";
            }
          } else {
            if (firstChar >= 44032 && firstChar <= 55203) {
              switch (true) {
                case firstChar < 45208:
                  firstVal = "ㄱ";
                  break;
                case firstChar < 45796:
                  firstVal = "ㄴ";
                  break;
                case firstChar < 46972:
                  firstVal = "ㄷ";
                  break;
                case firstChar < 47560:
                  firstVal = "ㄹ";
                  break;
                case firstChar < 48148:
                  firstVal = "ㅁ";
                  break;
                case firstChar < 49324:
                  firstVal = "ㅂ";
                  break;
                case firstChar < 50500:
                  firstVal = "ㅅ";
                  break;
                case firstChar < 51088:
                  firstVal = "ㅇ";
                  break;
                case firstChar < 52264:
                  firstVal = "ㅈ";
                  break;
                case firstChar < 52852:
                  firstVal = "ㅊ";
                  break;
                case firstChar < 53440:
                  firstVal = "ㅋ";
                  break;
                case firstChar < 54028:
                  firstVal = "ㅌ";
                  break;
                case firstChar < 54616:
                  firstVal = "ㅍ";
                  break;
                case firstChar < 55204:
                  firstVal = "ㅎ";
                  break;
              }
            }
          }
          return firstVal;
        })
      ),
    ];
  }

  function onViewableItemsChanged({ viewableItems }) {
    if (viewableItems && viewableItems.length) {
      let firstVal = viewableItems[0].item[props.scrollKey]
        .toUpperCase()
        .charAt(0);
      firstVal = "#";
      let firstChar = viewableItems[0].item[props.scrollKey]
        .toUpperCase()
        .charCodeAt(0);
      if (
        (firstChar >= 65 && firstChar <= 90) ||
        (firstChar >= 12593 && firstChar <= 12622)
      ) {
        firstVal = viewableItems[0].item[props.scrollKey]
          .toUpperCase()
          .charAt(0);

        if (firstChar === 12594) {
          firstVal = "ㄱ";
        }
        if (firstChar === 12600) {
          firstVal = "ㄷ";
        }
        if (firstChar === 12611) {
          firstVal = "ㅂ";
        }
        if (firstChar === 12614) {
          firstVal = "ㅅ";
        }
        if (firstChar === 12617) {
          firstVal = "ㅈ";
        }
      } else {
        if (firstChar >= 44032 && firstChar <= 55203) {
          switch (true) {
            case firstChar < 45208:
              firstVal = "ㄱ";
              break;
            case firstChar < 45796:
              firstVal = "ㄴ";
              break;
            case firstChar < 46972:
              firstVal = "ㄷ";
              break;
            case firstChar < 47560:
              firstVal = "ㄹ";
              break;
            case firstChar < 48148:
              firstVal = "ㅁ";
              break;
            case firstChar < 49324:
              firstVal = "ㅂ";
              break;
            case firstChar < 50500:
              firstVal = "ㅅ";
              break;
            case firstChar < 51088:
              firstVal = "ㅇ";
              break;
            case firstChar < 52264:
              firstVal = "ㅈ";
              break;
            case firstChar < 52852:
              firstVal = "ㅊ";
              break;
            case firstChar < 53440:
              firstVal = "ㅋ";
              break;
            case firstChar < 54028:
              firstVal = "ㅌ";
              break;
            case firstChar < 54616:
              firstVal = "ㅍ";
              break;
            case firstChar < 55204:
              firstVal = "ㅎ";
              break;
          }
        }
      }
      setActiveLetter(firstVal);
    }
  }

  return (
    <View style={[props.containerStyle]}>
      <FlatList
        {...props}
        ref={flatListRef}
        style={[props.listStyle]}
        onViewableItemsChanged={onViewableItemsChangedRef.current}
        viewabilityConfig={viewabilityConfigRef.current}
      />

      {!props.hideSidebar && (
        <Sidebar
          activeLetter={activeLetter}
          letters={letters}
          onScroll={debounce(onScroll)}
          sidebarContainerStyle={props.sidebarContainerStyle}
          sidebarLetterContainerStyle={props.sidebarLetterContainerStyle}
          sidebarLetterContainerActiveStyle={
            props.sidebarLetterContainerActiveStyle
          }
          sidebarLetterStyle={props.sidebarLetterStyle}
          sidebarLetterActiveStyle={props.sidebarLetterActiveStyle}
        />
      )}
    </View>
  );
}

AlphaFlatList.propTypes = {
  data: PropTypes.array,
  scrollKey: PropTypes.string,
  itemHeight: PropTypes.number,
  hideSidebar: PropTypes.bool,
  displayOnlyAvailableLetters: PropTypes.bool,
  listStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  sidebarContainerStyle: PropTypes.object,
  sidebarLetterContainerStyle: PropTypes.object,
  sidebarLetterContainerActiveStyle: PropTypes.object,
  sidebarLetterStyle: PropTypes.object,
  sidebarLetterActiveStyle: PropTypes.object,
};

AlphaFlatList.defaultProps = {
  scrollKey: "name",
  itemHeight: 20,
  hideSidebar: false,
};
