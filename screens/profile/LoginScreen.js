import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = () => {
    if (!isValidEmail(email)) {
      setEmailError(!isValidEmail(email) ? 'Please enter a valid email' : '');
      return;
    }
    console.log('Email:', email);
    console.log('Password:', password);
    navigation.navigate("MoodCheckInScreen");
  };
  const handleSignUp = () => {
    navigation.navigate("CreateAccountScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="white"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          placeholderTextColor="white"
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.orContainer}>
        <Text style={styles.orText}>Or Continue With</Text>
      </View>
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    height: 50,
    borderColor: '#589310',
    borderWidth: 1,
    paddingHorizontal: 60,
    borderRadius: 50,
    backgroundColor: '#589310',
    color: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#589310',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'center',
    marginTop: 16,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: "center",
  },
  orContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  orText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 16,
    fontSize: 14,
    textAlign: 'center',
    color: '#589310',
    textDecorationLine: 'underline',
  },
});

