import React, { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import patternsData from "./patternsData";

const db = SQLite.openDatabase("patternData.db");

const useDatabase = () => {
  const [patterns, setPatterns] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeDatabase = () => {
      db.transaction((tx) => {
        // Check if the table already exists
        tx.executeSql(
          'SELECT * FROM sqlite_master WHERE type="table" AND name="patterns"',
          [],
          (_, { rows }) => {
            if (rows.length === 0) {
              // Table does not exist, create and initialize
              tx.executeSql(
                "CREATE TABLE IF NOT EXISTS patterns (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, isFavorite INTEGER NOT NULL, configs TEXT NOT NULL)"
              );
              patternsData.forEach((pattern) => {
                tx.executeSql(
                  "INSERT INTO patterns (name, isFavorite, configs) VALUES (?, ?, ?)",
                  [pattern.name, pattern.isFavorite, JSON.stringify(pattern.configs)]
                );
              });
            }
            // Fetch data regardless of initialization to update the state
            fetchData();
          },
          (_, error) => console.log("Error checking table existence:", error)
        );
      });
    };

    const fetchData = () => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM patterns",
            [],
            (_, { rows }) => {
              setPatterns(rows._array);
              setIsLoading(false);
            },
            (_, error) => console.log("Error fetching patterns:", error)
          );
        }
      );
    };

    initializeDatabase();
  }, []); // No dependencies, ensure it only runs once on component mount

  return { patterns, isLoading };
};

export default useDatabase;
