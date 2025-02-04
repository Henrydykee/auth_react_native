
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/ui/button';
import { AuthContext } from '../store/auth_context';
import { useContext, useState } from 'react';


function WelcomeScreen() {


  const auth = useContext(AuthContext)

  function logout() {
    auth.logout();
  }


  
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Button children={"LogOut"} onPress={function (): void {
      logout()
      } }></Button>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});