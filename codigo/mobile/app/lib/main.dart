import 'package:flutter/cupertino.dart';

import 'package:app/pages/login/login.dart';
import 'package:app/pages/home/home.dart';

void main() => runApp(const CupertinoTextFieldApp());

class CupertinoTextFieldApp extends StatelessWidget {
  const CupertinoTextFieldApp({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoApp(
      debugShowCheckedModeBanner: false,
      title: 'Race Engineering',
      // theme: CupertinoThemeData(
      //   scaffoldBackgroundColor: CupertinoColors.secondarySystemBackground,
      // ),
      home: HomeView(),
    );
  }
}
