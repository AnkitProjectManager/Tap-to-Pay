import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './components/LoginScreen';
import MainApp from './components/MainApp';
import { AuthProvider, useAuth } from './components/AuthContext';

// Component to handle authentication state
const AppContent = () => {
  const { isAuthenticated,loading } = useAuth();

  if(loading){
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <SafeAreaView style={styles.container}><MainApp /></SafeAreaView> : <LoginScreen />}
    </NavigationContainer>
  );
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider style={styles.container}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function AppContentOld() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Poppins-Regular'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // splash bg color
    fontFamily: 'Poppins-Regular'
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    fontFamily: 'Poppins-Regular'
  },
});

export default App;
