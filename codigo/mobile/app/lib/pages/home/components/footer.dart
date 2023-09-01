import 'package:flutter/cupertino.dart';

import 'package:app/pages/login/login.dart';
import 'package:app/pages/register/register.dart';

class Footer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return (Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        SizedBox(
          width: double.infinity, // largura igual à tela
          child: CupertinoButton(
            color: CupertinoColors.darkBackgroundGray,
            onPressed: () {
              Navigator.push(
                context,
                CupertinoPageRoute(builder: (context) => LoginView()),
              );
            },
            child: Text('Login'),
          ),
        ),
        SizedBox(height: 16),
        SizedBox(
          width: double.infinity, // largura igual à tela
          child: CupertinoButton(
            onPressed: () {
              Navigator.push(
                context,
                CupertinoPageRoute(builder: (context) => RegisterView()),
              );
            },
            child: Text(
              'Criar conta',
              style: CupertinoTheme.of(context).textTheme.navTitleTextStyle,
            ),
          ),
        ),
      ],
    ));
  }
}
