import 'package:flutter_test/flutter_test.dart';
import 'package:app/shared/validators/email.validator.dart';

void main() {
  group('EmailValidator', () {
    test('Teste de email válido', () {
      final email = 'test@example.com';
      final isValid = EmailValidator.isValid(email);
      expect(isValid, true);
    });

    test('Teste de email inválido', () {
      final email = 'email_invalido';
      final isValid = EmailValidator.isValid(email);
      expect(isValid, false);
    });

    test('Teste de email vazio', () {
      final email = '';
      final isValid = EmailValidator.isValid(email);
      expect(isValid, false);
    });
  });
}
