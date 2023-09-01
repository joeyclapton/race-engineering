import 'package:app/pages/home/components/body.dart';
import 'package:app/pages/home/components/footer.dart';
import 'package:app/pages/home/components/header.dart';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Lap {
  final bool isAdditional;
  final int lapNumber;
  final String remainingGas;
  final String tyreType;
  final int minutes;
  final int seconds;
  final int milliseconds;
  final int id;

  Lap({
    required this.isAdditional,
    required this.lapNumber,
    required this.remainingGas,
    required this.tyreType,
    required this.minutes,
    required this.seconds,
    required this.milliseconds,
    required this.id,
  });
}

class LapsView extends StatefulWidget {
  @override
  _LapsViewState createState() => _LapsViewState();
}

class _LapsViewState extends State<LapsView> {
  final String image = "";
  final String title = "Corrida 03";
  final String startDate = "03/09";
  final String endDate = "05/09";
  final int laps = 50;
  List<Lap> _laps = [];
  List<Map<String, dynamic>> _teams = [];
  int _selectedTeamId = 0;

  @override
  void initState() {
    super.initState();
    fetchTeams();
  }

  void fetchTeams() async {
    try {
      Response response = await Dio().get(
        'https://race-engineering-api.azurewebsites.net/api/teams',
      );
      dynamic data = response.data;

      setState(() {
        _teams = List<Map<String, dynamic>>.from(data);
      });
    } catch (error) {
      print('Erro ao carregar os times: $error');
    }
  }

  void fetchLaps() async {
    try {
      Response response = await Dio().get(
        'https://race-engineering-api.azurewebsites.net/api/laps/team/$_selectedTeamId',
      );
      dynamic data = response.data;

      List<Lap> laps = List<Lap>.from(
        data.map(
          (item) => Lap(
            id: item['id'],
            lapNumber: item['lapNumber'],
            isAdditional: item['isAdditional'],
            remainingGas: item['remainingGas'],
            tyreType: item['tyreType'],
            minutes: 1,
            seconds: 20,
            milliseconds: 345,
          ),
        ),
      );

      setState(() {
        _laps = laps;
      });
    } catch (error) {
      print('Erro ao carregar as voltas: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text("Minhas voltas"),
      ),
      child: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  Text(
                    'Selecione o time',
                    style:
                        CupertinoTheme.of(context).textTheme.navTitleTextStyle,
                  ),
                  CupertinoPicker(
                    itemExtent: 32.0,
                    onSelectedItemChanged: (int index) {
                      setState(() {
                        _selectedTeamId = _teams[index]['id'];
                      });
                      fetchLaps();
                    },
                    children: _teams.map<Widget>((Map<String, dynamic> team) {
                      return Text(team['name']);
                    }).toList(),
                  )
                ],
              ),
            ),
            Expanded(
              child: Container(
                child: CupertinoScrollbar(
                  child: ListView.builder(
                    itemCount: _laps.length,
                    itemBuilder: (BuildContext context, int index) {
                      Lap lap = _laps[index];

                      return Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: Card(
                          elevation: 5,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          margin: EdgeInsets.symmetric(vertical: 12.0),
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(8.0),
                            child: Container(
                              decoration: BoxDecoration(
                                image: DecorationImage(
                                  image: AssetImage('assets/gradient.png'),
                                  // Substitua pelo caminho da sua imagem
                                  fit: BoxFit.cover,
                                ),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.stretch,
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.all(16.0),
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          'Volta ${lap.lapNumber ?? 'N/A'}',
                                          style: TextStyle(
                                            fontSize: 20.0,
                                            color: CupertinoColors.white,
                                            fontWeight: FontWeight.w500,
                                          ),
                                        ),
                                        SizedBox(height: 16.0),
                                        Text(
                                          '${lap.minutes}m ${lap.seconds}s ${lap.milliseconds}ms',
                                          style: TextStyle(
                                            fontSize: 26.0,
                                            fontWeight: FontWeight.w600,
                                            color: CupertinoColors.white,
                                          ),
                                        ),
                                        SizedBox(height: 16.0),
                                        Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceBetween,
                                          children: [
                                            Expanded(
                                              flex: 1,
                                              child: Column(
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.start,
                                                children: [
                                                  Text(
                                                    'Tanque Atual:',
                                                    style: TextStyle(
                                                      fontSize: 13.0,
                                                      color:
                                                          CupertinoColors.white,
                                                    ),
                                                  ),
                                                  SizedBox(height: 4.0),
                                                  Text(
                                                    '${lap.remainingGas}L',
                                                    style: TextStyle(
                                                      fontSize: 16.0,
                                                      color:
                                                          CupertinoColors.white,
                                                      fontWeight:
                                                          FontWeight.bold,
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                            SizedBox(width: 8.0),
                                            Expanded(
                                              flex: 1,
                                              child: Column(
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.start,
                                                children: [
                                                  Text(
                                                    'Tipo de Pneu:',
                                                    style: TextStyle(
                                                      fontSize: 12.0,
                                                      color:
                                                          CupertinoColors.white,
                                                    ),
                                                  ),
                                                  SizedBox(height: 4.0),
                                                  Text(
                                                    lap.tyreType,
                                                    style: TextStyle(
                                                      fontSize: 16.0,
                                                      color:
                                                          CupertinoColors.white,
                                                      fontWeight:
                                                          FontWeight.bold,
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                            SizedBox(width: 8.0),
                                            Expanded(
                                              flex: 1,
                                              child: Column(
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.start,
                                                children: [
                                                  Text(
                                                    'Tempo Adicional:',
                                                    style: TextStyle(
                                                      fontSize: 12.0,
                                                      color:
                                                          CupertinoColors.white,
                                                    ),
                                                  ),
                                                  SizedBox(height: 4.0),
                                                  Text(
                                                    lap.isAdditional
                                                        ? 'Sim'
                                                        : 'Não',
                                                    style: TextStyle(
                                                      fontSize: 16.0,
                                                      color:
                                                          CupertinoColors.white,
                                                      fontWeight:
                                                          FontWeight.bold,
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
