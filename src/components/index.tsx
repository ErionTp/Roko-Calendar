import { StyleSheet, View } from "react-native";
import React, { FC, useCallback, useEffect } from "react";
import CurrentMonth from "./pickers/current.month";
import CurrentYear from "./pickers/current.year";
import { tPicker } from "../features/domain/types/t.picker";
import CurrentDecade from "./pickers/current.decade";
import Header from "./header";
import { tTheme } from "../features/domain/types/t.theme";
import { ShowComponent } from "./show";
import Loading from "./loading";
import { useLayout, useMain, useStyles } from "../features/hooks";

type Props = object;

const MainContainer: FC<Props> = () => {
  // #region members
  const { pickerType, setContainerMeasures, theme } = useMain();
  // #endregion
  // #region variables
  const customStyles = useStyles(styles, theme);
  // #endregion
  // #region hooks
  const [{ measured, width, height }, onLayout] = useLayout();
  // #endregion
  // #region effects
  useEffect(() => {
    if (measured) setContainerMeasures({ width, height });
  }, [measured, height]);
  // #endregion
  // #region renders
  const renderItem: tPicker = {
    0: <CurrentMonth />,
    1: <CurrentYear />,
    2: <CurrentDecade />,
  };
  // #endregion
  return (
    <View onLayout={onLayout} style={customStyles.root}>
      <ShowComponent>
        <ShowComponent.When isTrue={measured}>
          <Header />
          {renderItem[pickerType]}
        </ShowComponent.When>
        <ShowComponent.Else>
          <Loading />
        </ShowComponent.Else>
      </ShowComponent>
    </View>
  );
};

export default MainContainer;

MainContainer.displayName = "MainContainer";

const styles = (theme: tTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
