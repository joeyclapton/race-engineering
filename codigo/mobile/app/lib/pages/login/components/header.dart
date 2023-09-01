import 'package:flutter/cupertino.dart';

class Header extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return (
        ClipRRect(
          borderRadius: BorderRadius.circular(20),
          child: Image.network(
            'https://images.unsplash.com/photo-1632223050202-d5b06dbd9e7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            fit: BoxFit.cover,
          ),
        )
    );
  }

}