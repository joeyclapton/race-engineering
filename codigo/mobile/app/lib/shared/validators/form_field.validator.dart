class FieldValidator {

  static String? getEmptyValuesMessage(String value, String field) {
    if (value.isEmpty) {
      return 'Preencha o campo $field';
    }

    return null;
  }

}