import 'package:flutter/cupertino.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:app/pages/home/components/body.dart';

void main() {
  testWidgets('Body widget should contain two Text widgets and a SizedBox widget', (WidgetTester tester) async {
    await tester.pumpWidget(
      CupertinoApp(
        home: Body(),
      ),
    );

    expect(find.byType(Text), findsNWidgets(2));
    expect(find.byType(SizedBox), findsOneWidget);
  });

  testWidgets('Body widget should contain the correct text', (WidgetTester tester) async {
    await tester.pumpWidget(
      CupertinoApp(
        home: Body(),
      ),
    );

    expect(find.text('Race Engineering'), findsOneWidget);
    expect(find.text('Explore a gestão de dados em tempo real e aprimorar a comunicação com sua equipe durante a corrida.'), findsOneWidget);
  });
}
