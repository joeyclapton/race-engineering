class EmailValidator {
  static bool isValid(String email){
    return RegExp(r'\S+@\S+\.\S+').hasMatch(email);
  }
}