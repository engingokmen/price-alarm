import { useFilters } from "@/context/filterContext";
import { StyleSheet, TextInput } from "react-native";

export const Search = () => {
  const { search, setSearch } = useFilters();

  return (
    <TextInput
      value={search}
      onChangeText={setSearch}
      placeholder="Search coins!"
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 4,
  },
});
