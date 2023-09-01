import 'package:flutter_test/flutter_test.dart';
import 'package:app/shared/validators/form_field.validator.dart';

void main() {
  group('FieldValidator', () {
    test('Teste de mensagem de campo vazio', () {
      final value = '';
      final field = 'Nome';
      final message = FieldValidator.getEmptyValuesMessage(value, field);
      expect(message, 'Preencha o campo $field');
    });

    test('Teste de campo preenchido', () {
      final value = 'John Doe';
      final field = 'Nome';
      final message = FieldValidator.getEmptyValuesMessage(value, field);
      expect(message, isNull);
    });
  });
}
