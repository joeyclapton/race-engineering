import 'package:app/pages/profile/profile.dart';
import 'package:flutter/cupertino.dart';
import 'package:app/pages/races/races.dart';
import 'package:app/pages/laps/laps.dart';
import 'package:app/pages/notes/notes.dart';


class AdminView extends StatefulWidget {
  const AdminView({Key? key}) : super(key: key);

  @override
  State<AdminView> createState() => _AdminViewState();
}

class _AdminViewState extends State<AdminView> {
  int _currentIndex = 0;

  final List<Widget> _tabs = [
    RacesView(),
    LapsView(),
    StickyNotesPage(),
    ProfileView()
  ];

  @override
  Widget build(BuildContext context) {
    return CupertinoTabScaffold(
      tabBar: CupertinoTabBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.car_detailed),
            label: 'Corridas',
          ),
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.clock_fill),
            label: 'Voltas',
          ),
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.folder_fill),
            label: 'Notas',
          ),
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.person_alt_circle_fill),
            label: 'Perfil',
          ),
        ],
      ),
      tabBuilder: (BuildContext context, int index) {
        return CupertinoTabView(
          builder: (BuildContext context) {
            return IndexedStack(
              index: _currentIndex,
              children: _tabs,
            );
          },
        );
      },
    );
  }
}
