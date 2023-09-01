import 'package:cherry_toast/resources/colors.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../../model/note/note.dart';
import '../../../services/database/DatabaseHelper.dart';
import '../notes.dart';

class StickyNote extends StatefulWidget {
  final Color color;
  final String text;
  final String description;
  final String id;
  final Function callback;

  const StickyNote({
    required this.id,
    required this.color,
    required this.text,
    required this.description,
    required this.callback,
  });

  @override
  _StickyNoteState createState() => _StickyNoteState();
}

class _StickyNoteState extends State<StickyNote> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  Future<void> onUpdateNote(Note noteUpdated) async {
    await DatabaseHelper.instance.update(noteUpdated);
    setState(() {
      //widget.text = _updatedText;
    });
    await widget.callback();
  }

  Future<void> onDeleteNote() async {
    await DatabaseHelper.instance.delete(widget.id);
    await widget.callback();
  }

  @override
  Widget build(BuildContext context) {
    String _updatedText = widget.text;
    String _updatedDescription = widget.description;
    Color _selectedColor = widget.color;
    TextEditingController _textEditingController =
        TextEditingController(text: widget.text);

    TextEditingController _descriptionEditingController =
        TextEditingController(text: widget.description);

    return Padding(
      padding: EdgeInsets.symmetric(vertical: 8),
      child: Container(
        width: double.infinity,
        child: Dismissible(
          key: UniqueKey(),
          direction: DismissDirection.endToStart,
          onDismissed:  (direction) {
            if (direction == DismissDirection.endToStart) {
              onDeleteNote();
            }
          },
          child: GestureDetector(
            onTap: () {
              showCupertinoDialog(
                context: context,
                builder: (BuildContext context) {
                  return CupertinoAlertDialog(
                    content: Column(
                      children: [
                        SizedBox(
                          height: 16,
                        ),
                        Form(
                          key: _formKey,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              CupertinoFormSection(
                                header: Text("Editar nota"),
                                children: [
                                  CupertinoTextFormFieldRow(
                                    controller: _textEditingController,
                                    placeholder: 'Título',
                                    onChanged: (value) {
                                      _updatedText = value;
                                    },
                                    validator: (value) {
                                      if (value == null || value.isEmpty) {
                                        return 'Por favor, insira um título';
                                      }
                                      return null;
                                    },
                                  ),
                                  CupertinoTextFormFieldRow(
                                    controller: _descriptionEditingController,
                                    placeholder: 'Descrição',
                                    onChanged: (value) {
                                      _updatedDescription = value;
                                    },
                                    validator: (value) {
                                      if (value == null || value.isEmpty) {
                                        return 'Por favor, insira uma descrição';
                                      }
                                      return null;
                                    },
                                    maxLines: 3,
                                  ),
                                  CupertinoFormRow(
                                    helper:
                                        Text('Toque na cor para selecionar'),
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
                                                  title:
                                                      Text('Selecione uma cor'),
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
                                                              CupertinoColors
                                                                  .activeGreen;
                                                          print(_selectedColor);
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
                            ],
                          ),
                        ),
                      ],
                    ),
                    actions: [
                      CupertinoDialogAction(
                        child: Text('Salvar'),
                        onPressed: () {
                          if (_formKey.currentState!.validate()) {
                            Note noteUpdated = Note(
                                title: _updatedText,
                                description: _updatedDescription,
                                id: widget.id,
                                color: _selectedColor);

                            onUpdateNote(noteUpdated);
                            Navigator.of(context).pop();
                          }
                        },
                      ),
                      CupertinoDialogAction(
                        child: Text('Cancelar'),
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                      ),
                    ],
                  );
                },
              );
            },
            child: Container(
              decoration: BoxDecoration(
                color: widget.color,
                borderRadius: BorderRadius.circular(8.0),
              ),
              padding: EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: EdgeInsets.only(bottom: 8),
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        widget.text,
                        style: TextStyle(
                          fontSize: 18.0,
                          fontWeight: FontWeight.w500,
                          color: CupertinoTheme.of(context)
                              .textTheme
                              .textStyle
                              .color,
                        ),
                      ),
                    ),
                  ),
                  Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      widget.description,
                      style: TextStyle(
                        fontSize: 14.0,
                        fontWeight: FontWeight.w300,
                        color: CupertinoTheme.of(context)
                            .textTheme
                            .textStyle
                            .color,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
