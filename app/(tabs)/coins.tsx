import { ButtonHeart } from "@/components/ButtonHeart";
import { DisplayPrice } from "@/components/DisplayPrice";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Alarms() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api.binance.com/api/v3/ticker/price"
      );
      const data = await response.json();
      console.log("data", data);
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <View>
      <Text>Select Coin</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text>{item.symbol}</Text>
            <DisplayPrice price={item.price} fontSize={12} />
            <View style={styles.iconButtonWrapper}>
              <ButtonHeart />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButtonWrapper: {
    justifySelf: "start",
  },
});
