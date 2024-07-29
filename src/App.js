import { useEffect, useRef, useState } from "react";
import { makeStyles, Tab, TabList } from "@fluentui/react-components";
import "./App.css";
import { addNext, multiplyNext, substractNext, useAppContext } from "./store";
import OperationContainer from "./components/operation/OperationContainer";

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "10px 20px",
    rowGap: "20px",
    alignSelf: "flex-start",
  },
  card: {
    width: "100%",
    maxWidth: "100%",
    height: "fit-content",
    alignItems: "center",
  },
  cardHeader: {
    width: "100%",
  },
});

const SYMBOL = {
  addition: "+",
  subtraction: "-",
  multiplication: "x",
};

export default function App() {
  const {
    state: { addition },
    dispatch,
  } = useAppContext();
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = useState("addition");
  const isInited = useRef(false);

  const { number1, number2 } = addition.length
    ? addition[addition.length - 1]
    : {};

  useEffect(() => {
    if (!isInited.current) {
      dispatch(addNext());
      dispatch(substractNext());
      dispatch(multiplyNext());
      isInited.current = true;
    }
  }, [dispatch, isInited]);

  if (!number1 || !number2) {
    return null;
  }

  return (
    <div className="App">
      <div className={styles.root}>
        <TabList
          selectedValue={selectedTab}
          onTabSelect={(_event, options) => {
            setSelectedTab(options.value);
          }}
        >
          <Tab key="addition" value="addition">
            Addition
          </Tab>
          <Tab key="subtraction" value="subtraction">
            Susbtraction
          </Tab>
          <Tab key="multiplication" value="multiplication">
            Multiplication
          </Tab>
        </TabList>
      </div>
      <OperationContainer
        symbol={SYMBOL[selectedTab]}
        operation={selectedTab}
      />
    </div>
  );
}
