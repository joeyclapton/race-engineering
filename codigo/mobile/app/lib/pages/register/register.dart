import 'package:alert/alert.dart';
import 'package:app/pages/admin/admin.dart';
import 'package:app/pages/home/components/body.dart';
import 'package:app/pages/home/components/footer.dart';
import 'package:app/pages/login/login.dart';
import 'package:app/pages/register/components/header.dart';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:app/services/http/http.dart';


class RegisterView extends StatefulWidget {
  @override
  _RegisterView createState() => _RegisterView();

}

class _RegisterView extends State<RegisterView> {
  late TextEditingController _email;
  late TextEditingController _password;
  late TextEditingController _name;
  int _selectedUserType = 0;

  Request request = Request();

  static const double _kItemExtent = 32.0;
  static const List<String> _userTypes = <String>[
    'Analista',
    'Piloto',
  ];

  String convertString(String input) {
    final Map<String, String> mappings = {
      'ANALYST': 'Analista',
      'DRIVER': 'Piloto',
    };

    for (var entry in mappings.entries) {
      if (entry.value == input) {
        return entry.key;
      }
    }

    return input;
  }

  @override
  void initState() {
    super.initState();
    _email = TextEditingController();
    _password = TextEditingController();
    _name = TextEditingController();
  }

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    _name.dispose();

    super.dispose();
  }

  void  _handleRegister(){
    String name = _name.text;
    String email = _email.text;
    String password = _password.text;
    String userType = convertString(_userTypes[_selectedUserType]);

    _onSubmit(name, email, password, userType);
  }

  _onSubmit(String name, String email, String password, String userType) async {
    const ENDPOINT = '/auth/register';
    final body = {
      'name': name,
      'email': email,
      'password': password,
      'role': userType
    };

    final response = await request.create(ENDPOINT, body);

    final userExists = response.statusCode == 409;
    final userCreated = response.statusCode == 201;

    if(userExists) {
      Alert(message: 'Desculpe, esse usuário já está cadastrado no sistema 😔').show();
    } else if(userCreated) {
      Alert(message: 'Usuário cadastrado com sucesso 🥰').show();
    } else {
      Alert(message: 'Erro ao fazer cadastro, tente novamente 😉').show();
    }
  }


  void _showDialog(Widget child) {
    showCupertinoModalPopup<void>(
        context: context,
        builder: (BuildContext context) => Container(
              height: 216,
              padding: const EdgeInsets.only(top: 6.0),
              // The Bottom margin is provided to align the popup above the system navigation bar.
              margin: EdgeInsets.only(
                bottom: MediaQuery.of(context).viewInsets.bottom,
              ),
              // Provide a background color for the popup.
              color: CupertinoColors.systemBackground.resolveFrom(context),
              // Use a SafeArea widget to avoid system overlaps.
              child: SafeArea(
                top: false,
                child: child,
              ),
            ));
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('Criar conta'),
        leading: GestureDetector(
          child: Icon(
            CupertinoIcons.back,
            color: CupertinoColors
                .darkBackgroundGray, // Define a cor da seta de voltar
          ),
          onTap: () {
            Navigator.of(context).pop(); // Comportamento de voltar
          },
        ),
      ),
      child: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Expanded(
                flex: 3,
                child: Padding(
                    padding: const EdgeInsets.all(16), child: Header())),
            Expanded(
                flex: 3,
                child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: [
                        CupertinoFormRow(
                            prefix: Text("Nome "),
                            child: CupertinoTextFormFieldRow(
                              controller: _name,
                              placeholder: "Insira seu nome completo",
                            )),
                        const SizedBox(
                          height: 8,
                        ),
                        CupertinoFormRow(
                            prefix: Text("Email "),
                            child: CupertinoTextFormFieldRow(
                              controller: _email,
                              placeholder: "Insira seu email ",
                            )),
                        const SizedBox(
                          height: 8,
                        ),
                        CupertinoFormRow(
                            prefix: Text("Senha"),
                            child: CupertinoTextFormFieldRow(
                              controller: _password,
                              placeholder: "Insira sua senha",
                              obscureText: true,
                            )),

                        CupertinoFormRow(
                          prefix: Text("Tipo"),
                          child: CupertinoButton(

                            // Display a CupertinoPicker with list of fruits.
                            onPressed: () => _showDialog(
                              CupertinoPicker(
                                magnification: 1.22,
                                squeeze: 1.2,
                                useMagnifier: true,
                                itemExtent: _kItemExtent,
                                // This is called when selected item is changed.
                                onSelectedItemChanged: (int selectedItem) {
                                  setState(() {
                                    _selectedUserType = selectedItem;
                                  });
                                },
                                children: List<Widget>.generate(
                                    _userTypes.length, (int index) {
                                  return Center(
                                    child: Text(
                                      _userTypes[index],
                                    ),
                                  );
                                }),
                              ),
                            ),
                            // This displays the selected fruit name.
                            child: Text(
                              _userTypes[_selectedUserType],
                              style: CupertinoTheme.of(context)
                                  .textTheme
                                  .navTitleTextStyle,
                            ),
                          ),
                        )
                      ],
                    ))),
            Padding(
                padding: EdgeInsets.symmetric(horizontal: 16),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SizedBox(
                      width: double.infinity, // largura igual à tela
                      child: CupertinoButton(
                        color: CupertinoColors.darkBackgroundGray,
                        onPressed: () {
                          _handleRegister();
                          Navigator.push(
                            context,
                            CupertinoPageRoute(
                                builder: (context) => LoginView(),
                          ));
                        },
                        child: Text(
                          'Criar conta',
                        ),
                      ),
                    ),
                  ],
                ))
          ],
        ),
      ),
    );
  }
}
