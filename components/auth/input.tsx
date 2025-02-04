import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Colors } from '../../constant/styles';


interface InputProps {
  label: string;
  keyboardType?: KeyboardTypeOptions;
  secure?: boolean;
  onUpdateValue: (text: string) => void;
  value: string;
  isInvalid: boolean;
}

function Input({
    label,
    keyboardType,
    secure,
    onUpdateValue,
    value,
    isInvalid,
  }: InputProps) {
    return (
      <View style={styles.inputContainer}>
        <Text style={[styles.labels, isInvalid && styles.labelInvalid]}>
          {label}
        </Text>
        <TextInput
          style={[styles.input, isInvalid && styles.inputInvalid]}
          keyboardType={keyboardType}
          secureTextEntry={secure}
        //   autoCapitalize=''
          onChangeText={onUpdateValue}
          value={value}
        />
      </View>
    );
  }
  
  export default Input;
  
  const styles = StyleSheet.create({
    inputContainer: {
      marginVertical: 8,
    },
    labels: {
      color: 'white',
      marginBottom: 4,
    },
    labelInvalid: {
      color: Colors.error500,
    },
    input: {
      paddingVertical: 8,
      paddingHorizontal: 6,
      backgroundColor: Colors.primary100,
      borderRadius: 4,
      fontSize: 16,
    },
    inputInvalid: {
      backgroundColor: Colors.error100,
    },
  });