import 'package:flutter/cupertino.dart';

import 'package:app/pages/register/register.dart';
import 'package:app/pages/admin/admin.dart';

class Footer extends StatelessWidget {
  bool? isValidForm = true;
  final Function() onSubmit;


  Footer({
    required this.isValidForm,
    required this.onSubmit
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        SizedBox(
          width: double.infinity,
          child: CupertinoButton(
            color: CupertinoColors.darkBackgroundGray,
            onPressed: () {
              if (isValidForm != null && isValidForm!) {
                onSubmit();
                Navigator.push(
                  context,
                  CupertinoPageRoute(
                      builder: (context) => AdminView()),
                );
              }
            },
            child: const Text('Fazer login'),
          ),
        ),
        SizedBox(height: 16),
        SizedBox(
          width: double.infinity,
          child: CupertinoButton(
            onPressed: () {
              Navigator.push(
                context,
                CupertinoPageRoute(
                    builder: (context) => RegisterView()),
              );
            },
            child: Text(
              'Criar conta',
              style: CupertinoTheme.of(context)
                  .textTheme
                  .navTitleTextStyle,
            ),
          ),
        ),
      ],
    );
  }

}