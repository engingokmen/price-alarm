import { AddRemoveFavoritesPressable } from "@/components/AddRemoveFavoritesPressable";
import { DisplayPrice } from "@/components/DisplayPrice";
import { Search } from "@/components/Search";
import { StarIcon } from "@/components/StarIcon";
import { useCoinsFiltered } from "@/context/coinsContext";
import { useFavorites } from "@/context/favoritesContext";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Alarms() {
  const { coins } = useCoinsFiltered();
  const { isFavorite } = useFavorites();

  return (
    <View>
      <Search />
      <FlatList
        data={coins}
        renderItem={({ item }) => {
          const isSelected = isFavorite(item.symbol);

          return (
            <AddRemoveFavoritesPressable
              id={item.symbol}
              isSelected={isSelected}
            >
              <View style={styles.container}>
                <Text style={styles.symbol}>{item.symbol}</Text>
                <DisplayPrice
                  price={item.price}
                  fontSize={16}
                  style={styles.price}
                />
                <View style={styles.star}>
                  <StarIcon isSelected={isSelected} />
                </View>
              </View>
            </AddRemoveFavoritesPressable>
          );
        }}
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
    alignItems: "center",
  },
  symbol: { flex: 1, maxWidth: 100 },
  price: { flex: 1 },
  star: { flex: 1, maxWidth: 16, justifySelf: "start" },
});
