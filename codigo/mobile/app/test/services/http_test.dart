import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:app/services/http/http.dart';
import 'dart:math';

void main() {
  group('Request', () {
    test('Teste de criação de requisição', () async {
      final request = Request();
      // Cria uma instância da classe Random
      final random = Random();

      // Gera um número inteiro aleatório entre 0 e 100 (exclusivo)
      int randomNumber = random.nextInt(10000000);

      final endpoint = '/auth/register';
      final body = {'name': 'John Does', 'email': 'cc$randomNumber@gmail.com', 'password': '123456789', 'role': 'DRIVER'};
      final response = await request.create(endpoint, body);

      expect(response.statusCode, 201);
    });
  });
}

