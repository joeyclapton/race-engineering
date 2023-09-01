import 'package:flutter/cupertino.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'dart:math';

import '../../shared/utils/httpInterceptor.dart';

class Race {
  final int id;
  final String name;
  final DateTime startDate;
  final DateTime endDate;
  final int totalLaps;

  Race({
    required this.id,
    required this.name,
    required this.startDate,
    required this.endDate,
    required this.totalLaps,
  });
}

class RacesView extends StatefulWidget {
  @override
  _RacesView createState() => _RacesView();
}

class _RacesView extends State<RacesView> {
  List<dynamic> _races = [];

  @override
  bool get wantKeepAlive => true;


  @override
  void initState() {
    super.initState();
    print('init state');
    fetchRaces();
  }

  void fetchRaces() async {
    String? token = await HttpInterceptor().getToken();
    if (token != null) {
      Dio dio = Dio();
      dio.options.headers['Authorization'] = 'Bearer $token';
      Response response = await dio.get('https://race-engineering-api.azurewebsites.net/api/races');
      dynamic driverInfo = response.data;

      dynamic races = driverInfo.map((item) {
        return Race(
          id: item['id'],
          name: item['name'],
          startDate: DateTime.parse(item['startDate']),
          endDate: DateTime.parse(item['endDate']),
          totalLaps: item['totalLaps'],
        );
      }).toList();

      setState(() {
        _races = races;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    DateFormat dateTimeFormat = DateFormat('dd/MM/yyyy - HH:mm');

    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('Lista de Corridas'),
      ),
      child: ListView.builder(
        itemCount: _races.length,
        itemBuilder: (BuildContext context, int index) {
          Race race = _races[index];

          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Card(
              elevation: 5,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              margin: EdgeInsets.symmetric(vertical: 12.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  SizedBox(
                    height: 4,
                  ),
                  ClipRRect(
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(10),
                      topRight: Radius.circular(10),
                    ),
                    child: Image.network(
                      'https://images.unsplash.com/photo-1657451237757-f101c899d4bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
                      height: 200,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          race.name,
                          style: TextStyle(
                            fontSize: 24.0,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 8.0),
                        Text(
                          'Data de Início: ${dateTimeFormat.format(race.startDate)}',
                          style: TextStyle(fontSize: 16.0),
                        ),
                        SizedBox(height: 8.0),
                        Text(
                          'Data de Fim: ${dateTimeFormat.format(race.endDate)}',
                          style: TextStyle(fontSize: 16.0),
                        ),
                        SizedBox(height: 8.0),
                        Text(
                          'Número de Voltas: ${race.totalLaps}',
                          style: TextStyle(fontSize: 16.0),
                        ),
                      ],
                    ),
                  ),
                  // CupertinoButton(
                  //   child: Text(
                  //     'Ver mais detalhes',
                  //     style: CupertinoTheme.of(context)
                  //         .textTheme
                  //         .navTitleTextStyle,
                  //   ),
                  //   onPressed: () {
                  //     // Lógica para exibir mais detalhes da corrida
                  //   },
                  // ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
