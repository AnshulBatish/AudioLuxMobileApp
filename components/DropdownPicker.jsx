import React, { useState, useEffect } from "react";
import { IconButton } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import * as SQLite from "expo-sqlite";
import patternsData from "../data/patternsData";
import PatternSettings from "./PatternSettings";
import { StyleSheet, Text, View } from "react-native";

const db = SQLite.openDatabaseAsync("patternData.db");

const DropdownPicker = () => {
  // States for patterns dropdown
  const [openPatternDropdown, setOpenPatternDropdown] = useState(false);
  const [patternValue, setPatternValue] = useState(null);
  const [patternLabel, setPatternLabel] = useState("");
  const [patternItems, setPatternItems] = useState([]);

  // States for configurations dropdown
  const [displayConfig, setDisplayConfig] = useState(false);
  const [openConfigDropdown, setOpenConfigDropdown] = useState(false);
  const [configItems, setConfigItems] = useState([]);
  const [configValue, setConfigValue] = useState(null);

  useEffect(() => {
    async function initializeDatabase() {
      const allRows = (await db).getAllAsync(
        'SELECT * FROM sqlite_master WHERE type="table" AND name="patterns"'
      );

      if ((await allRows).length == 0) {
        console.log("Time to make a new table!");
        (await db).execAsync(
          "CREATE TABLE IF NOT EXISTS patterns (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, isFavorite INTEGER NOT NULL, configs TEXT NOT NULL)"
        );

        patternsData.reverse().forEach(
          (pattern) =>
            async function () {
              (await db).runAsync(
                "INSERT INTO patterns (name, isFavorite, configs) VALUES (?,?, ?)",
                [
                  pattern.name,
                  pattern.isFavorite,
                  JSON.stringify(pattern.configs),
                ]
              );
            }
        );
      }

      fetchData();
    }
    initializeDatabase();
  }, []);

  // useEffect(() => {
  //   const initializeDatabase = () => {
  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         'SELECT * FROM sqlite_master WHERE type="table" AND name="patterns"',
  //         [],
  //         (_, { rows }) => {
  //           if (rows.length === 0) {
  //             tx.executeSql(
  //               "CREATE TABLE IF NOT EXISTS patterns (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, isFavorite INTEGER NOT NULL, configs TEXT NOT NULL)"
  //             );
  //             patternsData.reverse().forEach((pattern) => {
  //               tx.executeSql(
  //                 "INSERT INTO patterns (name, isFavorite, configs) VALUES (?, ?, ?)",
  //                 [
  //                   pattern.name,
  //                   pattern.isFavorite,
  //                   JSON.stringify(pattern.configs),
  //                 ]
  //               );
  //             });
  //           }
  //           fetchData(); // Fetch data after initializing
  //         },
  //         (_, error) => console.log("Error checking table existence:", error)
  //       );
  //     });
  //   };
  //   initializeDatabase();
  // }, []);

  async function fetchData() {
    const allRows = (await db).getAllAsync("SELECT * FROM patterns");

    const dropdownItems = constructDropdownItems(await allRows);
    setPatternItems(dropdownItems);
  }

  // const fetchData = () => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "SELECT * FROM patterns",
  //       [],
  //       (_, { rows }) => {
  //         const fetchedItems = rows._array;
  //         const dropdownItems = constructDropdownItems(fetchedItems);
  //         setPatternItems(dropdownItems);
  //       },
  //       (_, error) => console.log("Error fetching patterns:", error)
  //     );
  //   });
  // };

  async function updateTable(id, currentIsFavorite) {
    // Flip the isFavorite status
    const newIsFavorite = currentIsFavorite ? 0 : 1;

    // Perform the update in the database
    (await db).runAsync("UPDATE patterns SET isFavorite = ? WHERE id = ?", [
      newIsFavorite,
      id,
    ]);

    // Fetch updated data after update
    fetchData();
  }

  // const updateTable = (id, currentIsFavorite) => {
  //   // Flip the isFavorite status
  //   const newIsFavorite = currentIsFavorite ? 0 : 1;

  //   // Perform the update in the database
  //   db.transaction(
  //     (tx) => {
  //       tx.executeSql(
  //         "UPDATE patterns SET isFavorite = ? WHERE id = ?",
  //         [newIsFavorite, id],
  //         (_, result) => {
  //           console.log("Updated row:", result);

  //           // Fetch updated data after update
  //           fetchData();
  //         },
  //         (_, error) => console.log("Error updating table:", error)
  //       );
  //     },
  //     (error) => console.log("Transaction error:", error)
  //   );
  // };

  const constructDropdownItems = (items) => {
    const favorites = items.filter((item) => item.isFavorite);
    const nonFavorites = items.filter((item) => !item.isFavorite);

    return [
      { label: "Favorites", value: "favorites" },
      ...favorites.map((item) => ({
        label: item.name,
        value: item.id,
        icon: () => (
          <IconButton
            icon="star"
            iconColor="#f6dd54"
            onPress={() => updateTable(item.id, true)}
          />
        ),
        parent: "favorites",
      })),
      { label: "Patterns", value: "patterns" },
      ...nonFavorites.map((item) => ({
        label: item.name,
        value: item.id,
        icon: () => (
          <IconButton
            icon="star-outline"
            iconColor="#000000"
            onPress={() => updateTable(item.id, false)}
          />
        ),
        parent: "patterns",
      })),
    ];
  };

  async function handlePatternSelect(item) {
    setPatternLabel(item.label); // Update the selected pattern label
    setPatternValue(item.value); // Update the selected pattern
    setDisplayConfig(true); // Display the configuration dropdown
    setOpenConfigDropdown(false); // Close the configuration dropdown

    // Fetch configurations for the selected pattern
    const firstRow = (await db).getFirstAsync(
      "SELECT configs FROM patterns WHERE id = ?",
      [item.value]
    );

    const results = await firstRow;

    const configArray = JSON.parse(results.configs);

    const configDropdownItems = configArray.map((config, index) => ({
      label: config,
      value: index, // Index-based unique value
    }));

    setConfigItems(configDropdownItems); // Update configuration dropdown items
  }

  // const handlePatternSelect = (item) => {
  //   setPatternLabel(item.label); // Update the selected pattern label
  //   setPatternValue(item.value); // Update the selected pattern
  //   setDisplayConfig(true); // Open the configuration dropdown

  //   // Fetch configurations for the selected pattern
  // db.transaction((tx) => {
  //   tx.executeSql(
  //     "SELECT configs FROM patterns WHERE id = ?",
  //     [item.value],
  //     (_, { rows }) => {
  //       const configArray = JSON.parse(rows._array[0].configs);
  //       const configDropdownItems = configArray.map((config, index) => ({
  //         label: config,
  //         value: index, // Index-based unique value
  //       }));
  //       setConfigItems(configDropdownItems); // Update configuration dropdown items
  //     },
  //     (_, error) => console.log("Error fetching configurations:", error)
  //   );
  // });
  // };

  const handleConfigSelect = (item) => {
    setConfigValue(item.value);
  };

  return (
    <>
      <DropDownPicker
        open={openPatternDropdown}
        value={patternValue}
        items={patternItems}
        setOpen={setOpenPatternDropdown}
        setValue={setPatternValue}
        searchable={true}
        searchPlaceholder="Search for a pattern"
        categorySelectable={false}
        stickyHeader={true}
        maxHeight={400}
        closeAfterSelecting={true}
        placeholder="Select a Pattern"
        onSelectItem={handlePatternSelect}
        containerStyle={{
          width: "95%",
          marginTop: 20,
          alignSelf: "center",
        }}
      />

      {displayConfig && (
        <> 
          <Text style={styles.config}>Select a Configuration</Text>
          <DropDownPicker
            open={openConfigDropdown}
            items={configItems}
            value={configValue}
            setOpen={setOpenConfigDropdown}
            setValue={setConfigValue}
            placeholder="Select a Configuration"
            onSelectItem={handleConfigSelect}
            containerStyle={{
              width: "95%",
              marginTop: 10,
              alignSelf: "center",
              zIndex: 1,
            }}
          />
        </>
      )}

      {patternLabel && <PatternSettings pattern={patternLabel} />}
    </>
  );
};

export default DropdownPicker;

const styles = StyleSheet.create({
  config: {
    marginTop: 20,
    alignSelf: "center",
  },
});
