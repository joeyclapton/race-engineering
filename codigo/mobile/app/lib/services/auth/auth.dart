import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class AuthParams {
  String token;

  AuthParams({required this.token});
}

class AuthData {
  bool isAuthenticated;
  Function(AuthParams) authenticate;
  Function() logout;

  AuthData({
    required this.isAuthenticated,
    required this.authenticate,
    required this.logout,
  });
}

class AuthProvider with ChangeNotifier {
  bool _isAuthenticated = false;

  bool get isAuthenticated => _isAuthenticated;

  void authenticate(AuthParams authParams) {
    _isAuthenticated = true;
    // TODO: armazenar o token de autenticação
    notifyListeners();
  }

  void logout() {
    _isAuthenticated = false;
    // TODO: remover o token de autenticação
    notifyListeners();
  }
}
