import 'package:flutter/cupertino.dart';

import '../../../model/note/note.dart';
import '../../../services/database/DatabaseHelper.dart';
import '../notes.dart';
// import 'components/stickyNotes.dart';

class NotesForm extends StatefulWidget {
  @override
  _NotesForm createState() => _NotesForm();
}

class _NotesForm extends State<NotesForm> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  Color _selectedColor = CupertinoColors.systemYellow;
  final DatabaseHelper _databaseHelper = DatabaseHelper.instance;

  List<Note> _notes = [];

  void _submitNote() {
    if (_formKey.currentState!.validate()) {
      // TODO: Processar e salvar a nota
      final String title = _titleController.text;
      final String description = _descriptionController.text;

      // TODO: Salvar a nota no local desejado
      setState(() {
        _notes.add(Note(
          title: title,
          description: description,
          color: _selectedColor,
          id: '',
        ));
      });
      print(_selectedColor);
      Future<void> _addNote() async {
        Note newNote = Note(
            title: title,
            description: description,
            id: '',
            color: _selectedColor);
        await _databaseHelper.create(newNote);
      }

      _addNote();

      // Resetar o formulário
      _formKey.currentState!.reset();
      _selectedColor = CupertinoColors.systemYellow;
    }
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar:  CupertinoNavigationBar(
        middle: Text("Criar nova nota"),
        leading: GestureDetector(
          child: const Icon(
            CupertinoIcons.back,
            color: CupertinoColors
                .darkBackgroundGray, // Define a cor da seta de voltar
          ),
          onTap: () {
            Navigator.of(context).pop();
          },
        ),
      ),
      child: SafeArea(
        child: Center(
          child: Container(
            height: MediaQuery.of(context).size.height,
            padding: const EdgeInsets.all(16.0),
            child: Align(
              alignment: Alignment.center,
              child: SingleChildScrollView(
                child: Form(
                  key: _formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      CupertinoFormSection(
                        header: Text('Nova Nota'),
                        children: [
                          CupertinoTextFormFieldRow(
                            controller: _titleController,
                            placeholder: 'Título',
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Por favor, insira um título';
                              }
                              return null;
                            },
                          ),
                          CupertinoTextFormFieldRow(
                            controller: _descriptionController,
                            placeholder: 'Descrição',
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Por favor, insira uma descrição';
                              }
                              return null;
                            },
                            maxLines: 3,
                          ),
                          CupertinoFormRow(
                            helper: Text('Toque na cor para selecionar'),
                            child: Row(
                              children: [
                                Text('Cor'),
                                SizedBox(width: 8.0),
                                GestureDetector(
                                  onTap: () {
                                    showCupertinoModalPopup(
                                      context: context,
                                      builder: (BuildContext context) {
                                        return CupertinoActionSheet(
                                          title: Text('Selecione uma cor'),
                                          actions: [
                                            CupertinoActionSheetAction(
                                              onPressed: () {
                                                setState(() {
                                                  _selectedColor =
                                                      CupertinoColors
                                                          .systemYellow;
                                                });
                                                Navigator.pop(context);
                                              },
                                              child: Text('Amarelo'),
                                            ),
                                            CupertinoActionSheetAction(
                                              onPressed: () {
                                                setState(() {
                                                  _selectedColor =
                                                      CupertinoColors
                                                          .systemTeal;
                                                });
                                                Navigator.pop(context);
                                              },
                                              child: Text('Azul'),
                                            ),
                                            CupertinoActionSheetAction(
                                              onPressed: () {
                                                setState(() {
                                                  _selectedColor =
                                                      CupertinoColors
                                                          .destructiveRed;
                                                });
                                                Navigator.pop(context);
                                              },
                                              child: Text('Vermelho'),
                                            ),
                                            CupertinoActionSheetAction(
                                              onPressed: () {
                                                setState(() {
                                                  _selectedColor =
                                                      CupertinoColors.activeGreen;

                                                });
                                                Navigator.pop(context);
                                              },
                                              child: Text('Verde'),
                                            ),
                                          ],
                                          cancelButton:
                                              CupertinoActionSheetAction(
                                            onPressed: () {
                                              Navigator.pop(context);
                                            },
                                            child: Text('Cancelar'),
                                          ),
                                        );
                                      },
                                    );
                                  },
                                  child: Container(
                                    width: 20,
                                    height: 20,
                                    decoration: BoxDecoration(
                                      color: _selectedColor,
                                      shape: BoxShape.circle,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 16.0),
                      CupertinoButton(
                        onPressed: () {
                          if (_formKey.currentState!.validate()) {
                            _submitNote();
                            Navigator.push(
                              context,
                              CupertinoPageRoute(builder: (context) => StickyNotesPage()),
                            );
                          }
                        },
                        color: CupertinoColors.darkBackgroundGray,
                        child: const Text('Salvar Nota'),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

// Resto do código...
