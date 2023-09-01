import 'package:flutter/cupertino.dart';

class Footer extends StatelessWidget {
  final Function() onSubmit;
  final Function() onCreateAccount;

  Footer({
    required this.onSubmit,
    required this.onCreateAccount
  });

  @override
  Widget build(BuildContext context) {
    return (Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        SizedBox(
          width: double.infinity,
          child: CupertinoButton(
            color: CupertinoColors.darkBackgroundGray,
            onPressed: () {
              // if (_formKey.currentState!.validate()) {
              //   _handleLogin();
              //   Navigator.push(
              //     context,
              //     CupertinoPageRoute(
              //         builder: (context) => AdminView()),
              //   );
              // }
              onSubmit();
            },
            child: const Text('Fazer login'),
          ),
        ),
        SizedBox(height: 16),
        SizedBox(
          width: double.infinity,
          child: CupertinoButton(
            onPressed: () {
              // Navigator.push(
              //   context,
              //   CupertinoPageRoute(
              //       builder: (context) => RegisterView()),
              // );
              onCreateAccount();
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
