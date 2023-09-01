import 'package:app/services/database/DatabaseHelper.dart';
import 'package:flutter/cupertino.dart';
import '../../model/note/note.dart';
import 'components/notesForm.dart';
import 'components/stickyNotes.dart';

class StickyNotesPage extends StatefulWidget {
  get notes => null;

  @override
  _StickyNotesPageState createState() => _StickyNotesPageState();
}

class _StickyNotesPageState extends State<StickyNotesPage> {
  List<Note> notes = [];

  @override
  void initState() {
    super.initState();
    fetchNotes();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    fetchNotes();
  }

  Future<void> fetchNotes() async {
    notes = await DatabaseHelper.instance.readAll();
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar:  CupertinoNavigationBar(
        middle: Text("Minhas notas"),
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              SizedBox(
                width: double.infinity,
                child: CupertinoButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      CupertinoPageRoute(builder: (context) => NotesForm()),
                    );
                  },
                  child: Align(
                    alignment: Alignment.center,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'Criar uma nova nota',
                          style: CupertinoTheme.of(context).textTheme.navTitleTextStyle,
                        ),
                        Icon(
                          CupertinoIcons.add,
                          size: 28.0,
                          color: CupertinoTheme.of(context).textTheme.navTitleTextStyle.color,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              SizedBox(height: 16,),
              Container(
               height: MediaQuery.of(context).size.height - 295,
               child:  CupertinoScrollbar(
                 child: ListView.builder(
                   shrinkWrap: true,
                   itemCount: notes.length,
                   itemBuilder: (context, index) {
                     return Container(
                       width: double.infinity, // Define a largura como 100% do espaço disponível
                       child: StickyNote(
                         id: notes[index].id,
                         color: Color(notes[index].color.value),
                         text: notes[index].title,
                         description: notes[index].description,
                         callback: fetchNotes
                       ),
                     );
                   },
                 ),
               ),
             )
            ],
          ),
        ),
      ),
    );
  }
}

