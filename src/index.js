import React, { useEffect, useRef, useState } from "react";
import { SectionList, View, Text } from "react-native";

import PropTypes from "prop-types";
import debounce from "lodash.debounce";

import Sidebar from "./components/Sidebar";

const viewabilityConfig = {
  itemVisiblePercentThreshold: 30,
};

let touchVal = false;
let timer = null;

function sideHide(sectionDataLen, sectionIndex) {
  if (sectionIndex === 1) {
    if (sectionDataLen > 12) {
      return true;
    }
    return false;
  }
  if (sectionIndex === 2) {
    if (sectionDataLen > 10) {
      return true;
    }
    return false;
  }
  return true;
}
export default function AlphaFlatList(props) {
  const [activeLetter, setActiveLetter] = useState(undefined);
  const mounted = useRef(null);
  const sectionListRef = useRef();
  const onViewableItemsChangedRef = useRef(onViewableItemsChanged);
  const viewabilityConfigRef = useRef(viewabilityConfig);
  const [isHide, setHide] = useState(false);

  useEffect(() => {
    mounted.current = false;
    return () => {
      mounted.current = true;
    };
  }, []);

  function ySideBar() {
    touchVal = true;
    setHide(true);
    if (timer) {
      clearTimeout(timer);
    }
  }

  function nSideBar() {
    if (touchVal) {
      return;
    }
    if (!mounted.current) {
      setHide(false);
    }
  }

  const debounceNSide = function () {
    touchVal = false;
    timer = setTimeout(() => {
      nSideBar();
    }, 3000);
  };

  function onScroll(activeLetter) {
    if (activeLetter) {
      let index = -1;
      index = props.sections[props.sectionIndex].data.findIndex((item, i) => {
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
          const arrIndex = letters.indexOf(firstVal);
          if (arrIndex === 0) {
            return 0;
          }
          return i;
        }
      });

      setActiveLetter(activeLetter);
      const options = {
        animated: false,
        sectionIndex: props.sectionIndex,
        itemIndex: index === -1 ? 1 : index + 1,
      };

      sectionListRef.current.scrollToLocation(options);
    }
  }

  let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  if (props.displayOnlyAvailableLetters) {
    letters = [
      ...new Set(
        props.sections[props.sectionIndex].data.map((item) => {
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
    if (viewableItems.length === 0) return;
    if (viewableItems[0].section.title !== "all") {
      if (!mounted.current) {
        setActiveLetter("");
      }
      return;
    }
    if (
      viewableItems &&
      viewableItems.length &&
      viewableItems[0].item[props.scrollKey]
    ) {
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
      if (!mounted.current) {
        setActiveLetter(firstVal);
      }
    }
  }

  return (
    <View style={[props.containerStyle]}>
      <SectionList
        {...props}
        ref={sectionListRef}
        style={[props.listStyle]}
        onScrollBeginDrag={debounce(ySideBar)}
        onMomentumScrollEnd={debounce(debounceNSide)}
        onViewableItemsChanged={onViewableItemsChangedRef.current}
        viewabilityConfig={viewabilityConfigRef.current}
      />

      {isHide &&
        letters.length > 1 &&
        sideHide(
          props.sections[props.sectionIndex].data.length,
          props.sectionIndex
        ) && (
          <Sidebar
            activeLetter={activeLetter}
            letters={letters}
            onScroll={debounce(onScroll)}
            beginFunc={debounce(ySideBar)}
            endFunc={debounce(debounceNSide)}
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
  sectionIndex: PropTypes.number,
  sections: PropTypes.array,
  scrollKey: PropTypes.string,
  itemHeight: PropTypes.number,
  displayOnlyAvailableLetters: PropTypes.bool,
  listStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  sidebarContainerStyle: PropTypes.object,
  sidebarLetterContainerStyle: PropTypes.object,
  sidebarLetterContainerActiveStyle: PropTypes.object,
  sidebarLetterStyle: PropTypes.object,
  sidebarLetterActiveStyle: PropTypes.object,
  stickySectionHeadersEnabled: PropTypes.bool,
  renderSectionHeader: PropTypes.func,
};

AlphaFlatList.defaultProps = {
  scrollKey: "name",
  sectionIndex: 1,
  itemHeight: 20,
};
