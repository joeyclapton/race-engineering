import 'package:http/http.dart' as http;
import 'dart:convert';

class Request {
  final BASE_URL = 'https://race-engineering-api.azurewebsites.net/api';
  final HEADERS = {'Content-Type': 'application/json'};

  Future<http.Response>create(String endpoint, Map<String, dynamic> body) async {

    final url = Uri.parse('$BASE_URL$endpoint');
    final response = await http.post(url, headers: HEADERS, body: jsonEncode(body));


    return response;
  }

}