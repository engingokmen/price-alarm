import { Keyboard, TouchableWithoutFeedback } from "react-native";

interface IDismissKeyboard {
  children: React.ReactNode;
}

export const DismissKeyboard = ({ children }: IDismissKeyboard) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};
