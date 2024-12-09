import { AddRemoveFavoritesPressable } from "@/components/AddRemoveFavoritesPressable";
import { DisplayPrice } from "@/components/DisplayPrice";
import { Search } from "@/components/Search";
import { useCoinsFiltered } from "@/context/coinsContext";
import { useFavorites } from "@/context/favoritesContext";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Alarms() {
  const { coins } = useCoinsFiltered();
  const { favorites } = useFavorites();

  return (
    <View>
      <Search />
      <FlatList
        data={coins}
        renderItem={({ item }) => {
          const isFavorite = favorites.includes(item.symbol);

          return (
            <AddRemoveFavoritesPressable
              id={item.symbol}
              isSelected={isFavorite}
            >
              <View style={styles.container}>
                <Text style={styles.symbol}>{item.symbol}</Text>
                <DisplayPrice
                  price={item.price}
                  fontSize={16}
                  style={styles.price}
                />
                <View style={styles.star}>
                  <Ionicons
                    name={isFavorite ? "star" : "star-outline"}
                    size={16}
                    borderRadius={50}
                    color={"#D4AF37"}
                    backgroundColor={"#f2f2f2"}
                    marginRight={0}
                  />
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
  star: { flex: 1, maxWidth: 30, justifySelf: "start" },
});
