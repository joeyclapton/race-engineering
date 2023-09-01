import 'package:app/pages/register/components/header.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('Header widget should display an image', (WidgetTester tester) async {
    await tester.pumpWidget(Header());

    final imageFinder = find.byType(Image);
    expect(imageFinder, findsOneWidget);
  });

  testWidgets('Header widget should have a ClipRRect widget', (WidgetTester tester) async {
    await tester.pumpWidget(Header());

    final clipRRectFinder = find.byType(ClipRRect);
    expect(clipRRectFinder, findsOneWidget);
  });

  testWidgets('Header widget should have a BorderRadius.circular(20)', (WidgetTester tester) async {
    await tester.pumpWidget(Header());

    final clipRRectWidget = tester.widget<ClipRRect>(find.byType(ClipRRect));
    expect(clipRRectWidget.borderRadius, BorderRadius.circular(20));
  });

  testWidgets('Header widget should have an Image.network widget with the correct URL', (WidgetTester tester) async {
    await tester.pumpWidget(Header());

    final imageWidget = tester.widget<Image>(find.byType(Image));
    expect(imageWidget.image, NetworkImage('https://images.unsplash.com/photo-1642767226923-5d9abcea019a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'));
    expect(imageWidget.fit, BoxFit.cover);
  });
}