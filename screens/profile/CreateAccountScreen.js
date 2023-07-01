import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';

export default function CreateAccountScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleCreateAccount = () => {
    if (!isValidEmail(email) || password !== confirmPassword) {
      setEmailError(!isValidEmail(email) ? 'Please enter a valid email' : '');
      setPasswordError(password !== confirmPassword ? 'Passwords do not match' : '');
      return;
    }

    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="John Smith"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          placeholderTextColor="white"
        />
      </View>
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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry
          placeholderTextColor="white"
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>
      <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
        <Text style={styles.createAccountButtonText}>Create Account</Text>
      </TouchableOpacity>
      <View style={styles.buttonSeparator} />
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.loginLink}>Already have an account? Log in</Text>
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
    fontSize: 20,
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
  createAccountButton: {
    backgroundColor: '#589310',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-end',
    marginTop: 16,
  },
  createAccountButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonSeparator: {
    height: 16,
  },
  loginLink: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});
