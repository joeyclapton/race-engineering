import 'dart:ui';

import 'package:uuid/uuid.dart';

class Note {
  String id;
  String title;
  String description;
  final Color color;

  Note({
    String? id,
    required this.title,
    required this.description,
    required this.color,
  }) : id = id ?? Uuid().v4();

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'color': color.value,
    };
  }

  static Note fromMap(Map<String, dynamic> map) {
    return Note(
      id: map['id'],
      title: map['title'],
      description: map['description'],
      color: Color(map['color']),
    );
  }

  @override
  String toString() {
    return 'Note(id: $id, title: $title, description: $description, color: $color)';
  }
}
