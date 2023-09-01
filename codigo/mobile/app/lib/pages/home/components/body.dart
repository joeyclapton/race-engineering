import 'package:flutter/cupertino.dart';

class Body extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return (Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Race Engineering',
          style: CupertinoTheme.of(context).textTheme.navLargeTitleTextStyle,
        ),
        SizedBox(height: 8),
        Text(
          'Explore a gestão de dados em tempo real e aprimorar a comunicação com sua equipe durante a corrida.',
          style: CupertinoTheme.of(context).textTheme.navTitleTextStyle,
          textAlign: TextAlign.center,
        ),
      ],
    ));
  }
}
